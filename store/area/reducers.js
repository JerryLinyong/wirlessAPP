import * as actions from "./actionTypes"
import omit from "lodash/omit"
import u from "updeep"
import shortid from "shortid"
import { handleActions } from "redux-actions"

let initAreas={
    "0":{
        id       : 0,                                   //  唯一性区域编码，不可修改，可以使用shortid生成
        name     : "默认",                              //   区域名称
        visible  : true,                                //  是否显示
        memo     : "",                                  //  区域备注
        order    : 0,                                   //  排列序号                
        forwardTo: [],                                  //  转发至，列出目标显示屏的序列号,["2323","da12"]
        cards    : {                                    //  区域卡片列表
            "0":{                                       //  卡片编号卡片编号
                id          : 0,                        //  卡片编号，不允许重复，不允许变更，在创建时自动生成
                visible     : true,                     //  是否显示
                order       : 0,                        //  排列序号                
                name        : "默认",                   //  卡片名称
                memo        : "",                       //  卡片备注
                number      : 0,                        //  显示编号，用于转发至LED数码显示
                message     : "",                       //  当转发至LED点阵屏时显示的内容,默认是{number}
                level       : 0,                        //  该卡片的级别，取值0-5
                count       : 0,                        //  记录被呼叫的次数
                color       : "",                       //  默认显示的颜色
                star        : 0,                        //  是否加星标
                callers     : [],                       //  绑定设备的序列号，一般是呼叫器序列号，允许绑定多个
                lastCallTime: null,                     //  最近一次呼叫的时间
                forwardTo: []                           //  转发至，列出目标显示屏的序列号
            }
        }        
    }
}

export default handleActions({
    //增加分区 payload={分区数据}
    [actions.ADD_AREA]:(state, action) =>{
        //生成一个不重复的id
        let id=shortid.generate()
        state[id]=Object.assign({
            id       : id,                               
            name     : id,  
            visible  : true,                               
            memo     : "",                                  
            order    : 0,                                          
            forwardTo: [],                                   
        },action.payload)
        return state
    },
    //更新分区 payload={分区数据}
    [actions.UPDATE_AREA]:(state, action) => ({...state,[action.payload.sn]:action.payload}),
    //移除分区 payload={id:<>}
    [actions.REMOVE_AREA]:(state, action) => omit(state,action.payload),
    //移除分区 payload={id:<>,pos:<>}
    [actions.MOVE_AREA]:(state, action) =>{
        return u({[action.payload.id]:{
            order:action.payload.pos
        }},state)
    },
    //------------卡片-----------------------
    [actions.ADD_CARD]:(state, action) =>state,
    //更新分区 payload={分区数据}
    [actions.UPDATE_CARD]:(state, action) => ({...state,[action.payload.sn]:action.payload}),
    //移除分区 payload={id:<>}
    [actions.REMOVE_CARD]:(state, action) => omit(state,action.payload),
    //移除分区 payload=sn
    [actions.MOVE_CARD]:(state, action) =>state,

    //-------------以下是对所有分区进行操作----------------
    //加载所有分区
    [actions.LOAD_AREAS]:(state, action) => action.payload,
    //卸载所有分区
    [actions.UNLOAD_AREAS]:() => ({})

},initAreas)