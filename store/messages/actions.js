

import { createAction } from "redux-actions"
import * as actions from "./actionTypes"



//加载所有消息数据到Store payload={所有消息}
export const loadMessages          = createAction(actions.LOAD_MESSAGES) 
//卸载所有消息 payload={}
export const unloadMessages        = createAction(actions.CLEAR_MESSAGES)     
//增加消息 payload={消息数据}
export const addMessage            = createAction(actions.ADD_MESSAGE)     
//删除消息 payload=消息序列号
export const removeMessage         = createAction(actions.REMOVE_MESSAGE)  
//更新消息 payload={消息数据}
export const updateMessage         = createAction(actions.UPDATE_MESSAGE)    