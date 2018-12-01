let initDevices={
    "111":{
        type     : "",      //  设备类型,取值caller,watches,led
        sn       : "",      //  设备序列号
        regTime  : "",      //  注册时间
        id       : 0,       //  呼叫器编号
        gateway  : "",      //  该设备所绑定的网关序列号
        keyMap   : {},      //  按键定义, = {1: "",2: "",4: "",8: ""}
        forwardTo: [],      //  呼叫信息转发至
    }
}

export default function Devices(state = initDevices, action) {
    switch (action.type) {
        default:
            return state
    }   
  }