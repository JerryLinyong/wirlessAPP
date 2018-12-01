/**
 * 
 * 存放公共动作
 * 
 */

import { createAction } from "redux-actions"
import * as actions from "./actionTypes"


//加载所有配置参数  Store payload={所有配置参数}
export const loadSettings   = createAction(actions.LOAD_SETTINGS) 
//加载所有配置参数  Store payload   = {所有配置参数}
export const updateSettings = createAction(actions.UPDATE_SETTINGS) 
//发出配置参数改变  Store payload   = {<参数名称>:<新的值>}
export const settingsChange = createAction(actions.SETTINGS_CHANGE) 

