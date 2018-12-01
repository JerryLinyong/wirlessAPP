/**

    应用程序入口;

 */
import "./bootstrap"
import React from 'react';
import { createSwitchNavigator,createAppContainer} from 'react-navigation';
import EntryNavigator from "./routers/entry"
import { Provider as PaperProvider} from 'react-native-paper';
import { Provider,connect } from 'react-redux'
import rootStore  from "./store/store"
import { mapThemeStateToProps } from './store/common/theme/utils'
import Orientation from 'react-native-orientation';
import { screenOrientationChange } from "./store/common/screenOrientation/actions"

//启动saga中间件
rootStore.runSaga()

const RootNavigatorEntry = createAppContainer(createSwitchNavigator(
    {
        Entry    : EntryNavigator,        // 主导航入口
    },
    {
        initialRouteName: 'Entry',
        headerMode:"screen"
    }
))

//将Store里面的theme注入到PaperProvider组件
const ConnectedPaperProvider = connect(mapThemeStateToProps)(PaperProvider)
export default class App extends React.Component {
    // onScreenOrientationChange(orientation){
    //     logger.debug(_("屏幕方向更改为:{}").params(orientation))
    //     rootStore.dispatch(screenOrientationChange(orientation))
    // }
    // componentDidMount(){
    //     Orientation.addSpecificOrientationListener(this.onScreenOrientationChange)
    // }
    // componentWillUnmount(){
    //     Orientation.removeSpecificOrientationListener(this.onScreenOrientationChange)
    // }
    render() {
        return (
            <Provider store={rootStore}>
                <ConnectedPaperProvider>
                    <RootNavigatorEntry/>
                </ConnectedPaperProvider>
            </Provider>
        )
    }
}
