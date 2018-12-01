/**
 * 消息
*      {
        id         : 0,                 //  消息的唯一编号
        type       : 1,                 //  消息类型,0-呼叫信息，1-系统消息，2-告警消息 
        message    : "",                //  显示信息，如1楼大厅K包厢 - 服务
        gateway    : "",                //  从哪个网关序列号
        caller     : "",                //  呼叫器序列号
        key        : 1,                 //  呼叫器键值
        callTime   : null,              //  呼叫时的时间,
        replayTime : null,              //  当用户多次按下时记录最近时间
        endTime    : null,              //  该呼叫已处理的时间
        replayCount: 0,                 //  多次按下的次数,在超时处理时间内的均视为同一呼叫，当此值大于1时可以视为催促
        status     : 0                  //  0-新消息，1-设备处理  2-手工处理  3-超时处理  4-撤消/忽略
    }
 */

//默认时间降序显示呼叫消息
let initMessages=[

    ]

export default function message(state =initMessages, action) {
    switch (action.type) {
        default:
            return state
    }   
  }