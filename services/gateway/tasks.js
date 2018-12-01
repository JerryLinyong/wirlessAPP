/**
 * 连接网关
 */

import { delay } from 'redux-saga'
import { all, put,race,select,throttle,fork, call,  cancelled } from 'redux-saga/effects'
import { TCPClient } from "../../libs/socket"
import rootStore from '../../store/store'
import { connectGatewaySuccess,connectGatewayFail, connectGatewayError,connectGatewayCancel } from '../../devices/gateway/actions'
import { getConnectSettings,getGatewayAttrs } from "./utils"
import { CONNECT_GATEWAYS } from "../../devices/gateway/actionTypes"
import { startGatewayWorkFlow } from "./workflow"

let gatewayConnects={}//保存网关连接


//接收数据
function onGatewayData(sn,data){
    //解析网关数据
    logger.debug("Received data from <{}:{}> : ".params(this.settings.host,this.settings.port),String(data))
    rootStore.dispatch(connectGatewaySuccess({sn:sn}))
}
/**
 *   绑定网关连接的事件
 * @param {*} sn 网关序列号
 * @param {*} client TCP连接实例
 */
function bindGatewayConnectEvent(sn,client){
    let clientInfo="{sn} - {host}:{ip}".params(sn,client.settings.host,client.settings.port)
    //当连接成功时，应调用resolve完成连接操作
    client.onConnected=()=>{
        logger.debug(_("Connect gateway <{info}}> is success.").params(clientInfo))
        rootStore.dispatch(connectGatewaySuccess({sn:sn}))
    }
    client.onData=(data)=>onGatewayData.call(client,sn,data) //从网关接收到数据
    client.onDisconnected=()=>{
        logger.debug(_("Gateway <{info}> is disconnect.").params(clientInfo))
        rootStore.dispatch(connectGatewayFail({sn:sn}))//从网关接收到数据
    }
    client.onError=(e)=>{
        logger.debug(_("Error is occurred in gateway<{info}>:{err}").params(clientInfo,e.message))
        rootStore.dispatch(connectGatewayError({sn:sn,error:e}))
    }
}
/**
 * 连接到网关
 */
export function* connectToGateway(sn){
    let connSettings=yield getConnectSettings() 
    let client 
    try{
        //如果连接对象已存在，则销毁重新创建
        if(sn in gatewayConnects){
            delete gatewayConnects[sn]
        }
        //读取网关配置数据
        let gateway=yield getGatewayAttrs(sn)
        logger.debug(_("Ready connect to gateway <{sn},{ip}>").params(sn,gateway.ip))
        try{
            //创建新的TCP连接并保存网关连接
            gatewayConnects[sn] = client = new TCPClient({
                host:gateway.ip,
                port:gateway.port,
                keepAlive:connSettings.connectKeepAlive
            })
        }catch(e){
            logger.error(_("Error while build TCPClient instance:{}").params(e))
        }        
        //绑定TCP相关事件
        bindGatewayConnectEvent(sn,client)
        logger.debug(_("Starts connect to gateway <{sn},{ip}>").params(sn,gateway.ip))
        //开始连接网关，并启用超时处理，如果超时没有连接则任务失败
        let { connect, timeout } = yield race({
            connect:call(client.connect.bind(client)),
            timeout:call(delay,connSettings.connectTimeout*1000)
        })        
        //以上两个任务竞争，如果先超时则说明连接失败，否则连接成功,发出连接成功的action
        if(timeout){
            logger.debug(_("Connect to gateway <{sn},{ip}> is timeout").params(sn,gateway.ip))
            yield put(connectGatewayError({sn:sn,error:new Error(_('Connect to gateway <{sn}> is timeout.').params(sn))}))
        }
    }catch(e){
        //发出连接失败的action
        yield put(connectGatewayError({sn:sn,error:e})) 
    }finally{
        if (yield cancelled()){
            yield put(connectGatewayCancel({sn:sn}))
        }
    }
}

/**
 * 断开网关
 */
export function* disconnectFromGateway(sn){
    //如果连接对象已存在，则销毁
    if(sn in gatewayConnects){
        delete gatewayConnects[sn]
    }

}

/**
 * 连接所有网关
 * 此任务不会结束
 */
export function* connectAllGateway(){    
            //从state获取所有网关的数据
            let gateways = yield select(state=> Object.keys(state.gateways))
            logger.debug(_("Start connect gateways:{}".params(gateways.join(","))))
            //为每一个网关启动一个工作流程
            yield all(gateways.map((sn)=>{
                return fork(startGatewayWorkFlow,sn)
            }))    
            
    // //等待连接所有网关的指令
    // yield throttle(999999,CONNECT_GATEWAYS,function * (){        
  
    // })
}

