/**
 *  
 *   弹出菜单
 * 
 */
import React from 'react';
import { StyleSheet,View,TouchableOpacity,TouchableWithoutFeedback } from "react-native"
import { List,Surface,Portal,TouchableRipple } from 'react-native-paper';
import PropTypes from 'prop-types'


//  import { UIManager,findNodeHandle, } from "react-native"

// async function getComponentPosition(compoentInst){
//     const handle = findNodeHandle(compoentInst)
//     return new Promise((resolve,reject)=>{
//         UIManager.measure(handle,(x, y, width, height, pageX, pageY)=>{
//             resolve({
//                 x,              //相对父视图位置
//                 y,              //相对父视图位置
//                 width,          //组件宽度
//                 height,         //组件高度
//                 pageX,          //距离屏幕的绝对位置
//                 pageY           //距离屏幕的绝对位置
//             })
//         })
//     })
// }


const styles = StyleSheet.create({
    content: {
    //   paddingTop:Platform.select({
    //       ios:44,android:50
    //   })
    },
    contextStyle: {
        margin: 0,
        flex: 1,
    },
})

class PopupMenuItem extends React.Component{
    static propTypes={
        name:PropTypes.string,
        title:PropTypes.string,
    }
    static defaultProps = {
        title: "MenuItem"
    }
    render(){        
        return <List.Item title={this.props.title}/>
    }
}

export default class PopupMenu extends React.Component{
    static propTypes={
        onPress:PropTypes.func,
        items:PropTypes.arrayOf(PropTypes.object),
        location:PropTypes.object,                          //菜单的显示位置,{x,y}
        menuStyle:PropTypes.object,
        visible:PropTypes.bool,
        align:PropTypes.string,                             //指定菜单显示对齐的方式，取值为left,right,center,与position配合使用\
        theme:PropTypes.object
        }
    static defaultProps = {
        items:[],
        menuStyle: {
            position:"absolute",
            backgroundColor:"white",
            flexDirection: 'column',
            justifyContent: 'flex-end',
            width: 200,
            padding:0,
            zIndex:999,
            elevation: 4,
            maxHeight:600
        },
        x:0,
        y:0,
        align:"left",
        theme:{
            colors:{
                press:"rgba(0, 0, 0, .32)",
                text:"#333"
            }
        }
    } 
    constructor(props){
        super(props)
        this.state=Object.assign({},props)
    }
    toggle(){
        let visible=this.state.visible
        this.setState({visible:!visible})
    }
    show(){
        this.setState({visible:true})
    }
    hide(){
        this.setState({visible:false})
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps)
    }
    render(){
        if(!this.state.visible || this.state.items.length===0) return null
        let { theme }=this.props
        let posStyle={}
        if(this.props.align==="left"){
            posStyle={left:this.state.x,right:null,top:this.state.y}
        }else{//right
            posStyle={left:null,right:this.state.x,top:this.state.y}
        }
        return (            
            <Portal>
                <TouchableWithoutFeedback onPress={()=>this.hide()}>
                    <View style={{position:"absolute",top:0,left:0,right:0,bottom:0} } >
                        <Surface style={[this.state.menuStyle,posStyle]} >
                            {this.state.items.map((item)=>{
                            return (<TouchableOpacity 
                                        key={item.name}
                                        onPress={() => {
                                            this.props.onPress(item.name)
                                            setImmediate(()=>this.hide(),100)
                                        }}
                                    >
                                    <PopupMenuItem name={item.name} title={item.title}/>
                                </TouchableOpacity>)
                            })}
                        </Surface>
                    </View>
                </TouchableWithoutFeedback>
            </Portal>
        ) 
    }
}