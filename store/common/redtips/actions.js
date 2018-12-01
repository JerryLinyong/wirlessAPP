/**
 * 
 * 
 * 
 */
import { createAction } from "redux-actions"
import * as actions from "./actionTypes"


//------actions-----------
export const showRedTips   = createAction(actions.SHOW_RED_TIPS) 
export const hideRedTips   = createAction(actions.HIDE_RED_TIPS) 
export const toggleRedTips = createAction(actions.TOGGLE_RED_TIPS) 