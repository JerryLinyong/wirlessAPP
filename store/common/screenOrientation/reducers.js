/** 
 * 
 * 在底部标签页上显示红点提示
 * 
 */

import * as actions from "./actionTypes"
import { handleActions } from "redux-actions"
import Orientation from 'react-native-orientation';


//屏幕方向LANDSCAPE,PORTRAIT,PORTRAITUPSIDEDOWN,UNKNOWN    
const initialScreenOrientation =  Orientation.getInitialOrientation()      // 保存实时

export default handleActions({
    //锁定屏幕 payload=LANDSCAPE|PORTRAIT|...
    [actions.REFRESH_SCREEN_ORIENTATION]    : (state, action) =>action.payload ,
    //锁定屏幕 payload=LANDSCAPE|PORTRAIT|...
    [actions.LOCK_SCREEN_ORIENTATION]    : (state, action) =>action.payload ,
    //取消锁定屏幕 
    [actions.UNLOCK_SCREEN_ORIENTATION]    : (state, action) => ({...state,[action.payload]: false}),
    //屏幕方向改变  payload=LANDSCAPE|PORTRAIT|...
    [actions.ORIENTATION_CHANGE]  : (state, action) =>action.payload 
},initialScreenOrientation)