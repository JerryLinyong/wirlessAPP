/**
 * 
 *  提供网络服务
 * 
 */


const net=require("./react-native-tcp")

const SocketStatus={
    idle        : 0,        //  空闲
    disconnected: 1,        //  已断开
    connecting  : 2,        //  正在连接中
    connected   : 3         //  已连接
}

export class TCPClient{
    /**
     *  提供配置参数
     * @param {*} settings 
     *  {
     *      host:<>,
     *      port:8990,
     *      keepAlive:true
     *  }
     */
    constructor(settings){
        this.settings=settings
        this.status=SocketStatus.idle
    }
    /**
    *  返回客户端连接地址
    * { port: 12346, family: 'IPv4', address: '127.0.0.1' } 
    * */
    get address(){return this._socket.address()}
    
    _changeStatus(n){
        this.status=n
    }
    /**
     * 连接成功时返回
     */
    async connect(){
        this._changeStatus(SocketStatus.connecting)
        return new Promise((resolve,reject)=>{
            try{
                this._socket = net.createConnection(this.settings.port,this.settings.host)
                this._socket.setKeepAlive(this.settings.KeepAlive)
                this._socket.on('connect',()=>this.onConnect.call(this,resolve,reject)) 
                this._socket.on('error', this.onError.bind(this)) 
                this._socket.on('data', this.onData.bind(this))
                this._socket.on('close', this.onDisconnect.bind(this))
                this._socket.on('drain', this.onDrain.bind(this))
            }catch(e){
                logger.error("Error while createConnection for TCP[{host}:{port}]:{error}".params(this.settings.host,this.settings.port,e.message))
                this.onError(e) 
                reject(e)
            }
        })
    }
    /**
     * 重连
     */
    async reconnect(){
        //销毁对象
        if(this._socket) this._socket=null
        await this.connect()
    }

    disconnect(){
        try{
           this._socket.destroy() 
        }catch(e){
            logger.error("Error while disconnect from TCP[{host}:{port}]:{error}".params(this.settings.host,this.settings.port,e.message))
            this.onError(e)
        }
    }
    onConnect(resolve,reject){
        this._changeStatus(SocketStatus.connecting)
        this.onConnected.call(this)
        resolve()
    }
    onConnected(){}
    onDisconnect(){
        this._changeStatus(SocketStatus.disconnect)
        this.onDisconnected()
    }
    onDisconnected(){}
    onDrain(){}
    /**
     * 接收到数据时
     * @param {*} data 
     */
    onData(data){}
    onError(e){}
    /**
     * 当发送数据失败时调用，应用可以对发送失败的数据进行处理
     * @param {} data 
     */
    onSendFail(data){

    }
    write(data){
        try{
            this._socket.write(data)
        }catch(e){
            
        }
    }
    
}
