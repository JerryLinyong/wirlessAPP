/**
 * 
 * 
 * 
 */
import { createAction } from "redux-actions"
import { CHANGE_THEME } from "./actionTypes"


//改变主题 payload=<主题名称>
export const changeTheme          = createAction(CHANGE_THEME)