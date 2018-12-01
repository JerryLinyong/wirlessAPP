

import { createAction } from "redux-actions"
import * as actions from "./actionTypes"



//加载所有数码显示屏数据到Store payload={所有数码显示屏}
export const loadDisplayers          = createAction(actions.LOAD_DISPLAYERS) 
//卸载所有数码显示屏 payload={}
export const unloadDisplayers        = createAction(actions.UNLOAD_DISPLAYERS)     
//增加数码显示屏 payload={数码显示屏数据}
export const addDisplayer     = createAction(actions.ADD_DISPLAYER)     
//删除数码显示屏 payload=数码显示屏序列号
export const removeDisplayer         = createAction(actions.REMOVE_DISPLAYER)  
//更新数码显示屏 payload={数码显示屏数据}
export const updateDisplayer         = createAction(actions.UPDATE_DISPLAYER)    