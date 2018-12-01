/**
    "111":{
        sn       : "",      //  显示屏序列号
        regTime  : "",      //  显示屏登记到系统的时间        
        gateways : [],      //  显示屏所绑定的网关序列号
    }

 */

import * as actions from "./actionTypes"
import omit from "lodash/omit"

import { handleActions } from "redux-actions"

let initDisplayers={

}

export default handleActions({
    //增加呼叫器 payload={呼叫器数据}
    [actions.ADD_DISPLAYER]:(state, action) => ({...state,[action.payload.sn]:action.payload}),
    //更新呼叫器 payload={呼叫器数据}
    [actions.UPDATE_DISPLAYER]:(state, action) => ({...state,[action.payload.sn]:action.payload}),
    //移除呼叫器 payload=sn
    [actions.REMOVE_DISPLAYER]:(state, action) => omit(state,action.payload),

    //-------------以下是对所有呼叫器进行操作----------------
    //加载所有呼叫器
    [actions.LOAD_DISPLAYERS]:(state, action) => action.payload,
    //卸载所有呼叫器
    [actions.UNLOAD_DISPLAYERS]:() => ({})

},initDisplayers)