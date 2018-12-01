/**
    "111":{
        sn       : "",      //  呼叫器序列号
        regTime  : "",      //  呼叫器登记到系统的时间        
        keyMap   : {},      //  按键定义, = {1: "",2: "",4: "",8: ""}
        gateways : [],      //  默认情况下会接收所有消息,可以指定仅仅接收来自该呼叫器的呼叫消息
    }

 */

import * as actions from "./actionTypes"
import omit from "lodash/omit"

import { handleActions } from "redux-actions"

let initCallers={

}

export default handleActions({
    //增加呼叫器 payload={呼叫器数据}
    [actions.ADD_CALLER]:(state, action) => ({...state,[action.payload.sn]:action.payload}),
    //更新呼叫器 payload={呼叫器数据}
    [actions.UPDATE_CALLER]:(state, action) => ({...state,[action.payload.sn]:action.payload}),
    //移除呼叫器 payload=sn
    [actions.REMOVE_CALLER]:(state, action) => omit(state,action.payload),

    //-------------以下是对所有呼叫器进行操作----------------
    //加载所有呼叫器
    [actions.LOAD_CALLERS]:(state, action) => action.payload,
    //卸载所有呼叫器
    [actions.UNLOAD_CALLERS]:() => ({})

},initCallers)