

import { createAction } from "redux-actions"
import * as actions from "./actionTypes"



//加载所有呼叫器数据到Store payload={所有呼叫器}
export const loadCallers          = createAction(actions.LOAD_CALLERS) 
//卸载所有呼叫器 payload={}
export const unloadCallers        = createAction(actions.UNLOAD_CALLERS)     
//增加呼叫器 payload={呼叫器数据}
export const addCaller            = createAction(actions.ADD_CALLER)     
//删除呼叫器 payload=呼叫器序列号
export const removeCaller         = createAction(actions.REMOVE_CALLER)  
//更新呼叫器 payload={呼叫器数据}
export const updateCaller         = createAction(actions.UPDATE_CALLER)    