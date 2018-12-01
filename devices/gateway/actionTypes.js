

export const LOAD_GATEWAYS           = 'LOAD_GATEWAYS'                          //  加载所有网关数据到Store
export const UNLOAD_GATEWAYS         = 'UNLOAD_GATEWAYS'                        //  卸载所有网关数据
export const CONNECT_GATEWAYS        = 'CONNECT_GATEWAYS'                       //  连接所有网关
export const DISCONNECT_GATEWAYS     = 'DISCONNECT_GATEWAYS'                    //  断开所有网关连接

export const ADD_GATEWAY             = 'ADD_GATEWAY'                            //  增加网关
export const REMOVE_GATEWAY          = 'REMOVE_GATEWAY'                         //  移除网关
export const UPDATE_GATEWAY          = 'UPDATE_GATEWAY'                         //  更新网关
//----以下用来执行动作
export const CONNECT_GATEWAY         = 'CONNECT_GATEWAY'                        //  连接到网关
export const DISCONNECT_GATEWAY      = 'DISCONNECT_GATEWAY'                     //  断开网关连接

//----以下是用来汇报状态-----
export const CONNECT_GATEWAY_SUCCESS = 'CONNECT_GATEWAY_SUCCESS'                //  连接到网关成功
export const CONNECT_GATEWAY_ERROR   = 'CONNECT_GATEWAY_ERROR'                  //  网关连接出错
export const CONNECT_GATEWAY_FAIL    = 'CONNECT_GATEWAY_FAIL'                   //  连接到网关失败
export const CONNECT_GATEWAY_CANCEL  = 'CONNECT_GATEWAY_CANCEL'                 //  连接到网关被取消


//----
export const RECEIVE_GATEWAY_DATA    = 'RECEIVE_GATEWAY_DATA'                   //  从网关接收到数据