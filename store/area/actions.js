/**
 * 
 *  
 * 
 */

import { createAction } from "redux-actions"
import * as actions from "./actionTypes"

//加载分区定义数据到Store  payload = {所有分区}
export const loadAreas   = createAction(actions.LOAD_AREAS) 
//卸载分区定义数据 payload       = {}
export const unloadAreas = createAction(actions.UNLOAD_AREAS) 
// 增加分区 payload          = {分区数据}
export const addArea     = createAction(actions.ADD_AREA) 
// 移除分区 payload          = {id:分区id}
export const removeArea  = createAction(actions.REMOVE_AREA) 
//更新分区 payload           = {分区数据}
export const updateArea  = createAction(actions.UPDATE_AREA) 
//移动分区位置 payload         = {id: <分区id>,pos: <新的位置>}
export const moveArea    = createAction(actions.MOVE_AREA) 


// 增加卡片 payload          = {<分区id>:<卡片数据>}
export const addCard     = createAction(actions.ADD_CARD) 
// 移除卡片 payload          = {id:卡片id}
export const removeCard  = createAction(actions.REMOVE_CARD) 
//更新卡片 payload           = {卡片数据}
export const updateCard  = createAction(actions.UPDATE_CARD) 
//移动卡片位置 payload         = {id: <卡片id>,pos: <新的位置>}
export const moveCard    = createAction(actions.MOVE_CARD) 

