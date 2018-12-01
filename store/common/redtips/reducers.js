/** 
 * 
 * 在底部标签页上显示红点提示
 * 
 */

import { SHOW_RED_TIPS,HIDE_RED_TIPS,TOGGLE_RED_TIPS } from "./actionTypes"
import { handleActions } from "redux-actions"

const initRedTips={
    home:false,
    messages:false,
    statistics:false,
    settings:false,
    map:false,
}


export default handleActions({
    //显示红点提示 payload   = <home|messages|statistics|settings|map>
    [SHOW_RED_TIPS]    : (state, action) => ({...state,[action.payload]: true}),
    //隐藏红点提示 payload   = <home|messages|statistics|settings|map>
    [HIDE_RED_TIPS]    : (state, action) => ({...state,[action.payload]: false}),
    //切换红点显示状态 payload = <home|messages|statistics|settings|map>
    [TOGGLE_RED_TIPS]  : (state, action) => ({...state,[action.payload]: !state[action.payload]}),
},initRedTips)