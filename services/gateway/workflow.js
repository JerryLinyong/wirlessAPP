/**
 * 连接网关
 */

import { delay } from 'redux-saga'
import { put, take, fork, cancelled,cancel} from 'redux-saga/effects'
import { getConnectSettings,getGatewayAttrs } from "./utils"
import {takeForRequireConnect,takeForConnecting,takeStopReceiving } from "./takes"
import {connectAllGateway,connectToGateway,disconnectFromGateway} from "./tasks"
import {
    CONNECT_GATEWAY_SUCCESS,
    CONNECT_GATEWAY_FAIL,
    LOAD_GATEWAYS,
    CONNECT_GATEWAYS,
    UNLOAD_GATEWAYS,
    DISCONNECT_GATEWAYS,
    CONNECT_GATEWAY,
    DISCONNECT_GATEWAY,
    REMOVE_GATEWAY,
    UPDATE_GATEWAY,
    ADD_GATEWAY,
    CANCEL_GATEWAY_CONNECT,
    CONNECT_GATEWAY_CANCEL,
} from "../../devices/gateway/actionTypes"

/**
 * 处理连接网关的流程            
 */
export function* startGatewayWorkFlow(sn){    
    let conntetTask,action
    logger.debug(_("Gateway <{}> connect workflow is starting...").params(sn))
    try{
        while(true){//=true代表会无限重连
            action=null
            //从store读取与连接有关的设置参数
            let settings=yield getConnectSettings()
            //异步操作---->执行连接到网关
            conntetTask=yield fork(connectToGateway,sn) 
            logger.debug(_("Gateway<{}> is connecting...").params(sn))
            //堵塞操作---->在连接网关的过程中，如果侦听到连接失败，网关更新，删除网关，断开网关等action则应该分别执行任务
            action = yield takeForConnecting(sn)
            logger.debug(_("Gateway<{}> is connecting...").params(sn))
            if(action.type===CONNECT_GATEWAY_SUCCESS){//连接成功时
                logger.debug(_("Ready receive data from gateway<{}>.").params(sn))
                //堵塞操作---->在接收数据的过程中，如果接收到连接断开，网关更新等action，则应停止接收并断开连接
                yield takeStopReceiving(sn)
                //断开当前连接，然后进入下一个流程，即重新连接
                logger.debug(_("Ready disconnect from gateway<{}>").params(sn))
                yield disconnectFromGateway(sn)
            }else if(action.type===CONNECT_GATEWAY_FAIL){
                logger.debug(_("Gateway<{}> is lose of connect").params(sn))
                //如果连接失败，则延迟后重连
                yield delay(settings.connectInterval*1000)
            }else if([DISCONNECT_GATEWAYS,DISCONNECT_GATEWAY].includes(action.type)){
                logger.debug(_("Gateway<{}> is disconnecting>").params(sn))
                // 一般情况下，断开连接指令是人为发生，因此需要再次等待连接指令
                // 如果在等待连接的过程中接收到断开连接的action，则中止当前连接任务，然后进入等待重新开始连接的action
                // 注意：接收到明确的断开指令后，不会再次重连，而是等待再次连接的指令
                //如果连接任务还在执行则取消
                if(conntetTask.isRunning()) yield cancel(conntetTask)
                //堵塞操作---->等待再次请求连接或者重连的action   
                yield takeForRequireConnect(sn)
            }else if(action.type===REMOVE_GATEWAY){//如果网关被移除，则中止连接任务并且退出当前网关流程
                //如果连接任务还在执行则取消
                if(conntetTask.isRunning()) yield cancel(conntetTask)
                break
            }else{//发生错误时
                logger.debug(_("Error while gateway<{}> is being connect>").params(sn))
                if(conntetTask.isRunning()) yield cancel(conntetTask)
                yield delay(1000)//TODO settings.connectInterval*1000
            }
            logger.debug(_("Ready reconnect to gateway<{}>").params(sn))
        }  
    }catch(e){
        logger.error(_("Error while executing gateway <{sn}> workflow:{}").params(sn,e.message))
    }finally{
        if (yield cancelled()){
            yield put(CONNECT_GATEWAY_CANCEL({sn:sn}))
        }
    }
}

/**
 * 启动所有网关的流程
 */
export function* connectAllGatewayWorkFlow(){
    //侦测连接所有网关
    let allTasks=yield fork(connectAllGateway) 
    while(true){
        //侦听添加，卸载网关的action
        let action=yield take([ADD_GATEWAY,UNLOAD_GATEWAYS])
        if(action.type===ADD_GATEWAY){//如果有新的网关加入，则为此开始一个新的网关连连接任务
            yield fork(startGatewayWorkFlow,action.payload.sn)
        }else if(action.type===UNLOAD_GATEWAYS){//如果所有网关被卸载，则中止所有任务
            yield cancel(allTasks)
            break
        }
    }
}