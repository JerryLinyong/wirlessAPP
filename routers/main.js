import React from 'react'
import {  createMaterialTopTabNavigator ,createAppContainer} from 'react-navigation';
import { StyleSheet,  View, Text , StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {  Appbar, withTheme } from 'react-native-paper';
import PopupMenu from "../components/popupmenu"
import { connect } from 'react-redux'

import HomePage from '../modules/home'
import MapPage from '../modules/map'
import MessagePage from '../modules/message'
import StatisticsPage from "../modules/statistics"
import SettingsPage from "../modules/settings"

export const mapStateToProps=(state,ownProps)=>{//mapStateToProps
    return {
        theme:state.theme,
        redtips:state.redtips
    }
}

export const mapDispatchToProps=(dispatch,ownProps )=>{//mapDispatchToProps 
    return {
        changeTheme:(theme)=>dispatch({type:CHANGE_THEME,theme:theme}),
        
    }
}
       
const styles = StyleSheet.create({
    appbar: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
    },
    redDot:{
        position:"absolute",
        right:-4,
        top:-4,
        width:8,
        height:8,
        borderRadius:4,
        backgroundColor:"red"
    }
})

/**
 *  为每个标签页提供
 *   1. 对导航栏参数处理
 *   2、注入主题
 * @param {} Page
 * @param String routeName 
 */
function TabbedPage(Page,options){
    let {theme,redtips }=options
    //在页面组件中声明navigationOptions静态数据来定义要在导航条上显示的内容
    let headerOptions=Object.assign({
        title:"",
        icon:"",
        tabBarLabel:'',//可选的
        actions:[],//{name:"",icon:"",color:"",size:32}
        menu:[],//显示菜单{name:"",icon:"",title:""}
        showRedDot:false
    },Page.navigationOptions || {})
    //如果tabBarLabel为空则使用
    headerOptions.tabBarLabel=headerOptions.tabBarLabel || headerOptions.title
    //允许指定图标的名称及在大小
    if(typeof headerOptions.icon==="string") {
        headerOptions.icon={name:headerOptions.icon,size:24}
    }else{//指定默认的图标
        headerOptions.icon=Object.assign({name:"home",size:24},headerOptions.icon)
    }
    let showRedtips=(headerOptions.name in redtips) ? redtips[headerOptions.name] : false
    //标题图标
    headerOptions.tabBarIcon=(({focused,tintColor})=>{
        if(focused){
            return (
                <View>
                    <Icon name={ headerOptions.icon.name} color={ theme.colors.primary} size={ headerOptions.icon.size}/>
                    {showRedtips ? <Text style={styles.redDot}/> : null}
                </View>
                )
        }else{
            return (
                <View>
                    <Icon name={ headerOptions.icon.name} color={tintColor} size={ headerOptions.icon.size}/>
                    {showRedtips ? <Text style={styles.redDot}/> : null}
                </View>
            )
        }        
    })
    return (class extends React.Component{
        constructor(props){
            super(props)
            this.pageRef=React.createRef()
            this.menuRef=React.createRef()
        }
        static navigationOptions=({navigation,screenProps,navigationOptions})=>{
            return headerOptions
        }
        render(){            
            //为每个页面注入数据和分发器
            let ThemeingPage=withTheme(Page)
            return (
                <View>
                    <StatusBar backgroundColor={theme.colors.primary}></StatusBar>
                    <Appbar.Header theme={theme}>
                        <Appbar.Content theme={theme} title={headerOptions.title}/>
                        {/* 显示上下文按钮 */}
                        {
                            headerOptions.actions.map((action)=>{
                                return <Appbar.Action key={ action.name } icon={action.icon} onPress={() =>{
                                    let pageInst=this.pageRef.current
                                    if(typeof pageInst.onNavigationAction==="function"){
                                        pageInst.onNavigationAction.call(pageInst,action.name)
                                    }
                                } } />
                            })
                        }
                        {/* 显示上下文菜单按钮 */}
                        {
                            headerOptions.menu.length===0 ? null :(
                                 <Appbar.Action icon="menu" onPress={() =>{
                                    this.menuRef.current.toggle()
                                } }>
                                </Appbar.Action>
                            )
                        }                       
                    </Appbar.Header>
                    <PopupMenu 
                        ref={this.menuRef}
                        align="right" 
                        y={56} 
                        items={headerOptions.menu} 
                        onPress={(name)=>{
                            let pageInst=this.pageRef.current
                            pageInst.onNavigationMenu.call(pageInst,name)
                        }}
                    />
                    <ThemeingPage showRedDot={this.showRedDot} ref={this.pageRef} />
                </View>
            )
        }
    })
}

function createMainNavigator(props){
    let { theme, changeTheme ,redtips } = props
    const MainNavigator = createMaterialTopTabNavigator(
        {
            Home: { screen: TabbedPage(HomePage,props) },
            Messages: { screen: TabbedPage(MessagePage,props) },
            Map: { screen: TabbedPage(MapPage,props) },
            Statistics: { screen: TabbedPage(StatisticsPage,props) },
            Settings: { screen: TabbedPage(SettingsPage,props) }
        },
        {
            initialRouteName: 'Home',
            tabBarPosition: 'bottom',//tab bar的位置, 可选值： 'top' or 'bottom'
            swipeEnabled: true,//是否允许滑动切换tab页
            animationEnabled: true,//是否在切换tab页时使用动画
            lazy: true,//是否懒加载            
            backBehavior: 'none',//返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
            tabBarOptions: {
                activeTintColor: theme.colors.primary,//当前选中的tab bar的文本颜色和图标颜色
                inactiveTintColor: theme.colors.tint,//当前未选中的tab bar的文本颜色和图标颜色
                showIcon: true,//是否显示tab bar的图标，默认是false
                showLabel: true,//showLabel - 是否显示tab bar的文本，默认是true
                upperCaseLabel: false,//是否将文本转换为大小，默认是true
                pressColor: theme.colors.press,//material design中的波纹颜色(仅支持Android >= 5.0)
                pressOpacity: 0.8,//按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
                style: {//tab bar的样式
                    backgroundColor: '#fff',
                    paddingBottom: 0,
                    borderTopWidth: 0.2,
                    paddingTop: 8,
                    borderTopColor: '#ccc',
                    overflow:"visible"
                },
                labelStyle: {//tab bar的文本样式
                    fontSize: 11,
                    margin: 0,
                    textAlign:"center"
                },
                iconStyle:{
                    overflow:"visible"
                },
                indicatorStyle: { 
                    height: 2,
                    backgroundColor:  theme.colors.primary
                }//tab 页指示符的样式 (tab页下面的一条线).
            }
        })
    return createAppContainer(MainNavigator)
}


class MainPage extends React.Component {
    static navigationOptions={
        header:null//不显示标题栏
    }
    constructor(props){
        super(props)
        this.state={
            redDotVisible:false
        }
    }
    componentDidMount(){
        // setInterval((()=>{
        //     this.showRedDot(!this.state.redDotVisible)
        // }).bind(this),1000)
    }
    showRedDot(value){
        if(value===undefined) value=this.state.redDotVisible 
        this.setState({redDotVisible:value})
    }
    componentWillReceiveProps(nextProps){
    }
    render(){
        const MainNavigator=createMainNavigator(this.props)
        return(
            <MainNavigator/>
        )            
    }
}    

export default connect(mapStateToProps,mapDispatchToProps)(MainPage)