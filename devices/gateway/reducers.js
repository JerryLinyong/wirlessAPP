/**
 *     "32432":{                         //  网关序列号
            icon           : "",         //  网关图标
            model          : "",         //  网关型号
            sn             : "",         //  网关序列号
            name           : "",         //  网关名称
            ip             : "",          //  网关ip地址
            gateway        : "",         //  网关地址
            dns            : "",         //  DNS地址
            subnetmask     : "",         //  子网掩码
            dhcp           : false,      //  是否开启dhcp
            mode           : 0,          //  网关的工作模式,0-tcp 1-udp
            status         : 0,          //  0-未连接，1-正在连接,2-已连接,3-出现错误
            statusText     : "",         //  最近连接信息，状态显示信息，当连接出错时，显示出错信息
            lastConnectTime: "",         //  最后一次连接成功的时间
            enabled        : true//
    }

 */
import * as actions from "./actionTypes"
import  mapValues from "lodash/mapValues"
import omit from "lodash/omit"

import { handleActions } from "redux-actions"

export const GatewayConnectStatus={
    disconnected : 0,//未连接
    connecting   : 1,//正在连接",
    connected    : 2,//已连接",
    disconnecting: 3//正在断开连接"
}

export const GatewayConnectStatusText={
    0:_('未连接'),
    1:_('正在连接'),
    2:_('已连接'),
    3:_('正在断开连接')
}

let initGateways={
    "8001":{                            //  网关序列号
        icon           : "",            //  网关图标
        model          : "",            //  网关型号
        sn             : "",            //  网关序列号
        name           : "一楼大厅",     //  网关名称
        ip             : "127.0.0.1",   //  网关ip地址
        port           : 8951,
        gateway        : "",            //  网关地址
        dns            : "",            //  DNS地址
        subnetmask     : "",            //  子网掩码
        dhcp           : false,         //  是否开启dhcp
        mode           : 0,             //  网关的工作模式,0-tcp 1-udp
        status         : 0,             //  0-未连接，1-未连接-人为关闭连接,2-正在连接,10-已连接   小于10视为未连接
        statusText     : "",            //  最近连接信息，状态显示信息，当连接出错时，显示出错信息
        lastConnectTime: null,          //  最后一次连接成功的时间
        connectCount   : 0,             //  连接成功的次数，每连接成功一次加一
        enabled        : true,           //
        error          : null,          // 当连接网关出错时，此值是error对象
    },
    // "8002":{                            //  网关序列号
    //     icon           : "",            //  网关图标
    //     model          : "",            //  网关型号
    //     sn             : "",            //  网关序列号
    //     name           : "二楼大厅",     //  网关名称
    //     ip             : "127.0.0.1",   //  网关ip地址
    //     port           : 8951,
    //     gateway        : "",            //  网关地址
    //     dns            : "",            //  DNS地址
    //     subnetmask     : "",            //  子网掩码
    //     dhcp           : false,         //  是否开启dhcp
    //     mode           : 0,             //  网关的工作模式,0-tcp 1-udp
    //     status         : 0,             //  0-未连接，1-正在连接,2-已连接,3-正在断开连接
    //     statusText     : "",            //  最近连接信息，状态显示信息 
    //     lastConnectTime: "",            //  最后一次连接成功的时间
    //     connectCount   : 0,             //  连接成功的次数，每连接成功一次加一
    //     error          : null,          // 当连接网关出错时，此值是error对象
    //     enabled        : true           //
    // }
}

function updateConnectStatus(state,action,status){
    let sn=action.payload.sn
    if(action.payload.error){
        return {...state,[sn]:{...state[sn],error:action.payload.error}}
    }else{//如果没有出错，则需要清空错误
        return {...state,[sn]:{...state[sn],error:null,status:status,statusText:GatewayConnectStatusText[status]}}
    }
}

export default handleActions({
    //增加网关 payload={网关数据}
    [actions.ADD_GATEWAY]:(state, action) => ({...state,[action.payload.sn]:action.payload}),
    //更新网关 payload={网关数据}
    [actions.UPDATE_GATEWAY]:(state, action) => ({...state,[action.payload.sn]:action.payload}),
    //移除网关 payload={sn:<网关sn>}
    [actions.REMOVE_GATEWAY]:(state, action) => omit(state,action.payload.sn),
    
    //-------------以下是对网关连接的处理----------------
    //连接指定的网关,payload={sn:<网关sn>},将状态置为:正在连接
    [actions.CONNECT_GATEWAY]:(state, action) => updateConnectStatus(state,action,GatewayConnectStatus.connecting),
    //断开指定的网关,payload={sn:<网关sn>} 将状态置为:正在断开连接
    [actions.DISCONNECT_GATEWAY]:(state, action) =>updateConnectStatus(state,action,GatewayConnectStatus.disconnecting),   
    //网关连接成功 payload={sn:<网关sn>} 
    [actions.CONNECT_GATEWAY_SUCCESS]:(state, action) =>updateConnectStatus(state,action,GatewayConnectStatus.connected),
    //网关连接失败 payload={sn:<网关sn>} 
    [actions.CONNECT_GATEWAY_FAIL]:(state, action) => updateConnectStatus(state,action,GatewayConnectStatus.disconnected),
     //网关连接错误 payload={sn:"",error:<err>}  
    [actions.CONNECT_GATEWAY_ERROR]:(state, action) =>updateConnectStatus(state,action),
    //网关连接被取消 payload={sn:<网关sn>} 
    [actions.CONNECT_GATEWAY_CANCEL]:(state) => state ,

    
    //-------------以下是对所有网关进行操作----------------
    //加载所有网关
    [actions.LOAD_GATEWAYS]:(state, action) => action.payload,
    //卸载所有网关
    [actions.UNLOAD_GATEWAYS]:(state, action) => state,
    //连接所有网关,将状态置为:正在连接
    [actions.CONNECT_GATEWAYS]:(state, action) => mapValues(state,(value,key)=>({...value,status:GatewayConnectStatus.connecting})),
    //断开所有网关,将状态置为:正在断开连接
    [actions.DISCONNECT_GATEWAYS]:(state, action) => mapValues(state,(value,key)=>({...value,status:GatewayConnectStatus.disconnecting}))
},initGateways)