/**
 * 
 * 本文件用来定义一些在网关连接工作流程中应该侦听的action
 * 
 */


import { take } from 'redux-saga/effects'
import * as actions from "../../devices/gateway/actionTypes"

export function* takeForGateway(sn,actions){
    let action={}
    while(true){
        action=yield take(actions)
        //判断action是否有效
        logger.debug("takeForGateway by action(type="+action.type+",payload="+JSON.stringify(action.payload)+")")
        if(action.payload && (sn in action.payload || action.payload.sn===sn)) break 
        //当对所有网关进行操作时，LOAD_GATEWAYS,UNLOAD_GATEWAYS,CONNECT_GATEWAYS,DISCONNECT_GATEWAYS
        if(action.type.endsWith("GATEWAYS")) break
    }
    logger.debug("takeForGateway matched: "+action.type)
    return action
}
/**
 * 在等待连接成功时
 */
export function* takeForConnecting(sn){
    return yield takeForGateway(sn,[ 
        actions.CONNECT_GATEWAY_SUCCESS, 
        actions.CONNECT_GATEWAY_FAIL, 
        actions.CONNECT_GATEWAY_ERROR, 
        actions.CANCEL_GATEWAY,
        actions.DISCONNECT_GATEWAY, 
        actions.REMOVE_GATEWAY,  
        actions.UPDATE_GATEWAY,
        actions.DISCONNECT_GATEWAYS
    ])
}
/**
 * 在等待连接请求连接
 */
export function* takeForRequireConnect(sn){
    return yield takeForGateway(sn,[
        actions.CONNECT_GATEWAY,
        actions.CONNECT_GATEWAYS
    ])
}
/**
 * 在接收数据时，如果接收到：
      1.取消连接
      2.断开连接
      3.移除网关
      4.更新网关
      5.断开连接
 *  则停止接收
 */
export function* takeStopReceiving(sn){
    return yield takeForGateway(sn,[
        actions.CONNECT_GATEWAY_FAIL,
        actions.CANCEL_GATEWAY,//取消连接
        actions.DISCONNECT_GATEWAY, //断开连接
        actions.REMOVE_GATEWAY, //移除网关
        actions.UPDATE_GATEWAY,//更新网关
        actions.DISCONNECT_GATEWAYS//断开连接
    ])
}