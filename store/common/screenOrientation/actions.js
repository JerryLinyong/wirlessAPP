/**
 * 
 * 
 * 
 */
import { createAction } from "redux-actions"
import * as actions from "./actionTypes"


//锁定屏幕 payload=LANDSCAPE|PORTRAIT|...
export const refreshScreenOrientation=createAction(actions.REFRESH_SCREEN_ORIENTATION)
//锁定屏幕 payload=LANDSCAPE|PORTRAIT|...
export const lockScreenOrientation=createAction(actions.LOCK_SCREEN_ORIENTATION)
//取消锁定屏幕 payload=LANDSCAPE|PORTRAIT|...
export const unlockScreenOrientation=createAction(actions.UNLOCK_SCREEN_ORIENTATION)
//屏幕方向改变 payload=LANDSCAPE|PORTRAIT|...
export const screenOrientationChange=createAction(actions.ORIENTATION_CHANGE)