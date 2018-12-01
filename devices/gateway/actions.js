/**
 * 
 * 存放公共动作
 * 
 */

import { createAction } from "redux-actions"
import * as actions from "./actionTypes"

//加载所有网关数据到Store payload={所有网关的数组}
export const loadGateways          = createAction(actions.LOAD_GATEWAYS) 
//卸载所有网关数据 payload={}
export const unloadGateways        = createAction(actions.UNLOAD_GATEWAYS)       

//增加网关 payload={网关数据}
export const addGateway            = createAction(actions.ADD_GATEWAY) 
//增加网关 payload={sn:<网关sn>}
export const removeGateway         = createAction(actions.REMOVE_GATEWAY)  
//更新网关 payload={网关数据}
export const updateGateway         = createAction(actions.UPDATE_GATEWAY)  

//-----------------连接网关操作------------------------------

// 连接所有网关连接    payload={}    
export const connectGateways       = createAction(actions.CONNECT_GATEWAYS)               
// 连接所有网关连接    payload={}    
export const disconnectGateways    = createAction(actions.DISCONNECT_GATEWAYS)  
// 连接指定的网关   payload={sn:<网关sn>}   
export const connectGateway        = createAction(actions.CONNECT_GATEWAY)  
// 断开指定的网关   payload={sn:<网关sn>}
export const disconnectGateway     = createAction(actions.DISCONNECT_GATEWAY) 



//-----------------以下用来汇报连接状态-------------------------------
//连接到网关成功  payload={sn:<网关sn>}
export const connectGatewaySuccess = createAction(actions.CONNECT_GATEWAY_SUCCESS)  
//连接到网关失败  payload={sn:<网关sn>}
export const connectGatewayFail    = createAction(actions.CONNECT_GATEWAY_FAIL)          
//连接到网关出错  payload={sn:<sn>,error:<error>}
export const connectGatewayError = createAction(actions.CONNECT_GATEWAY_ERROR)  
//网关连接被取消  payload={sn:<网关sn>}
export const connectGatewayCancel = createAction(actions.CONNECT_GATEWAY_CANCEL) 