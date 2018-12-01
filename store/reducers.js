import { combineReducers } from 'redux'
import theme from "./common/theme/reducers" 
import redtips from "./common/redtips/reducers" 
import screenOrientation from "./common/screenOrientation/reducers" 
import messages from "./messages/reducers" 
import settings from "./settings/reducers" 
//设备
import gateways from "../devices/gateway/reducers"
import displayers from "../devices/displayer/reducers"
import callers from "../devices/caller/reducers"
//
import areas from "./area/reducers" 

export default combineReducers({
  theme,              // 当前主题
  screenOrientation,  // 屏幕方向
  redtips,            // 控制主界面标签页的红点提示 
  areas,              // 分区
  messages,           // 消息
  gateways,           // 登记的网关列表
  displayers,         // 数码显示管
  callers,            // 呼叫器
  settings            // 系统配置
})


