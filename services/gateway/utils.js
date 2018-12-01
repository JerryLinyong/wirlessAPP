 /**
  * 
  *  用来从Store中提取一些与网关连接相关的数据  * 
  * 
  */
 
import { select } from 'redux-saga/effects'
import pick from "lodash/pick"
 
 //提取与连接有效的参数,连接保活,断线提醒，连接重连间隔，连接超时
 export function* getConnectSettings(){
    let settings=yield select(state=>state.settings)
    return pick(settings,["connectKeepAlive","disconnectRemind","connectInterval","connectTimeout"])
}
//提取网关配置参数
export function* getGatewayAttrs(sn){
    return yield select(state=>state.gateways[sn])
}