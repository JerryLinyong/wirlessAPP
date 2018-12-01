import * as actions from "./actionTypes"
import { handleActions } from "redux-actions"
import transform from "lodash/transform"
import map from "lodash/map"
import Orientation from 'react-native-orientation';


const defaultColors=["white","#f5222d","#1890ff","#a0d911"]//取消，结帐-红色，下单-蓝色，呼叫-绿色
const defaultCallKeyMap={
    1:{name:_("取消"),cancel:true,switch:false,color:defaultColors[1]},
    2:{name:_("结账"),cancel:false,switch:false,color:defaultColors[2]},
    4:{name:_("下单"),cancel:false,switch:false,color:defaultColors[3]},
    8:{name:_("呼叫"),cancel:false,switch:false,color:defaultColors[4]}
}

/**
    定义场景
    场景={
        name:<<场景名称>,
        keys:{ 
            '1': { name: '取消', cancel: false, switch: false, color: 'red' },
            '2': { name: '结账', cancel: false, switch: false, color: '#dd' },
            '4': { name: '下单', cancel: false, switch: false, color: ' blue' },
            '8':{ name: '呼叫', cancel: false, switch: false, color: '#a0d911' } 
        }
    } 

    cancel=代表该键是取消
    switch=true代表该键具有开关切换性质，以结帐为例，按一下结帐，再按一下取消结帐。
         当switch=true时，cancel无效

 */
function defineScene(name,keys,colors=defaultColors){
    //确保colors有效
    colors=map(Array(4),(item,index)=>colors[index] || defaultColors[index])
    try{
        return {
            name:name,
            keys:transform([1,2,4,8],(result,key,index)=>{
                let keyDefine=keys[key]
                if(typeof keyDefine==="string"){
                    keyDefine={
                        name:keys[key],
                        cancel:index===0,//默认第一个键为取消键
                        switch:false,
                        color:colors[index]
                    }
                }else{
                    keyDefine=Object.assign({
                        cancel:false,
                        switch:false,
                        color:""
                    },keyDefine)
                }
                result[key]=keyDefine
            },{})
        }
    }catch(e){
        return {
            name:name,
            keys:defaultCallKeyMap
        }
    }
}

const Scenes={
    0: defineScene(_("自定义"),{1:_("取消"),2: _("结账"),4: _("下单"),8: _("呼叫")},["red","#dd"," blue"]),
    1: defineScene(_("餐厅"),{1 : _("取消"),2: _("结账"),4: _("下单"),8: _("呼叫")}),
    2: defineScene(_("酒吧"),{1 : _("取消"),2: _("结账"),4: _("酒水"),8: _("呼叫")}),
    3: defineScene(_("医护"),{1 : _("取消"),2: _("点滴"),4: _("紧急"),8: _("呼叫")}),
    4: defineScene(_("酒店"),{1 : _("取消"),2: _("退房"),4: _("紧急"),8: _("呼叫")}),
    5: defineScene(_("银行"),{1 : _("取消"),2: _("授权"),4: _("安保"),8: _("呼叫")}),
    6: defineScene(_("超市"),{1 : _("取消"),2: _("紧急"),4: _("无"),8 : _("呼叫")}),
    7: defineScene(_("车间"),{1 : _("取消"),2: _("维修"),4: _("无"),8 : _("呼叫")})
}

const initSettings={
    appTitle            : _("美一无线呼叫管理系统"),                  //  应用标题用来显示
    version             : "1.0",                                    //  当前软件版本
    theme               : "default",                                //  界面主题名称
    language            : "auto",                                   //  界面显示语言
    homeViewStyle       : "default",                                //  首页默认显示方式，default/area：按分区展示 , service: 按服务类型展示
    startPage           : "default",                                //  启动时默认显示的页面
    connectKeepAlive    : true,                                     //  是否启用TCP长连接保活
    connectInterval     : 30,                                       //  网关重连间隔，秒
    connectTimeout      : 60,                                       //  连接超时
    disconnectRemind    : true,                                     //  当无法连接到网关时提醒，默认通过tocast和系统消息提醒
    registerEnabled     : true,                                     //  是否启用注册
    autoRegisterTo      : '',                                       //  自动注册呼叫器到,空代表询问，其他代表分区的id或名称
    callTimeoutEnabled  : true,                                     //  当呼叫超过时间没有处理时是否启用超时处理
    callTimeout         : 120,                                      //  启用超时处理的时间
    msgRetainDays       : 5,                                        //  消息保留天数，超过自动清除
    msgRetainCount      : 500,                                      //  消息保留条数，超过自动清除
    voiceRemindEnabled  : false,                                    //  是否开启语音播放
    callVoiceRemindLevel: 0,                                        //  当有呼叫级别大于指定级别时播放语音，小于则不播放
    autoDiscovery       : false,                                    //  启用网关自动发现
    applyScene          : 1,                                        //  应用场景，
    callKeyMap          : defaultCallKeyMap,                        //  呼叫器按钮自定义
    screenOrientation   : 'auto',                                   //  屏幕方向，取值=auto,LANDSCAPE-LEFT,LANDSCAPE-RIGHT,PORTRAIT,PORTRAITUPSIDEDOWN
    //日志级别
    logLevel            : "INFO",                                   //  日志级别
    logToNetwork        : false,                                    //  打印日志到网络,地址：logs.huanyutong.com，用于远程诊断时使用
    //-----以下配置用于配置对外访问接口-------------
    enabledApi          : false,                                    //  启用WebAPI访问
    apiUrl              : "",                                       //  由应用访问外部的http url,当发生呼叫信息时会向此url发送通知
    secret              : "",                                       //  安全密钥，访问webapi必须提供密钥才允许访问
    apiRetryCount       : 3,                                        //  当访问外部url时失败的重试次数
}

export default handleActions({
    //加载配置 payload={配置参数}
    [actions.LOAD_SETTINGS]:(state, action) => action.payload,
    //更新配置 payload={<name>:<value>}
    [actions.UPDATE_SETTINGS]:(state, action) => ({...state,...action.payload}),
    //配置已改变 payload={<name>:<new value>}
    [actions.SETTINGS_CHANGE]:(state) => state
},initSettings)