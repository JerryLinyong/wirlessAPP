import React from 'react';
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Platform,StyleSheet, Text, View,Image,Button,ScrollView} from 'react-native';
import { List,Surface,Portal,TouchableRipple } from 'react-native-paper';
import { changeTheme } from "../../store/common/theme/actions"
import { toggleRedTips } from "../../store/common/redtips/actions"
import { connect } from 'react-redux'
import { AreaList, AreaTabs } from "./area"

const styles = StyleSheet.create({
    content: {

    }
})

const mapStateToProps=(state,ownProps)=>{//mapStateToProps
    return {
        screenOrientation:state.screenOrientation,
        areas:state.areas
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeTheme:(theme)=>dispatch(changeTheme(theme)),
        toggleRedTips:(item)=>dispatch(toggleRedTips(item))
    }
}


class HomePage extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        screenOrientation:PropTypes.oneOf(["LANDSCAPE","LANDSCAPE-LEFT","LANDSCAPE-RIGHT","PORTRAIT","PORTRAITUPSIDEDOWN","UNKNOWN"]),
    }
    static defaultProps = {
        title: "美一无线呼叫系统"
    }
    static navigationOptions = {
        name:"home",
        title: '首页',
        icon:"home-outline",//图标
        actions:[
            {name:"email",icon:"search"},
            {name:"home",icon:"home"}
        ],
        menu:[
            {name:"email",title:"search"},
            {name:"home",title:"home"}
        ]
    }
    constructor(props) {
        super(props)
        this.state = {
            currentArea:null
        }
        this.menuRef=React.createRef()
    }
    /**
     * 当导航条的按钮按下时触发此事件
     * @param {String} name 
     */
    onNavigationAction(name){
        if(name==="home"){
            
        }
    }
    changeArea(areaId){
        this.setState({currentArea:areaId})
    }
    /**
     *显示菜单
     */
    onNavigationMenu(name){
        alert("我是首页："+name)
    }
    render() {        
        return (
            <View>
                <AreaTabs areas={ this.props.areas} current={this.state.currentArea} onAreaChange={(area)=>this.changeArea(area)} ></AreaTabs>
                <ScrollView>
                    <AreaList screenOrientation={this.props.screenOrientation}  current={this.state.currentArea}  areas={ this.props.areas}></AreaList>
                </ScrollView>                
            </View>
        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(HomePage)

