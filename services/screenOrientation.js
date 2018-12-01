/**
 * 侦测屏幕方向变化
 */
import Orientation from 'react-native-orientation';
import { LOCK_SCREEN_ORIENTATION,UNLOCK_SCREEN_ORIENTATION} from "../store/common/screenOrientation/actionTypes"
import { screenOrientationChange } from "../store/common/screenOrientation/actions"

import { SETTINGS_CHANGE} from "../store/settings/actionTypes"
import rootStore  from "../store/store"
import { take, fork, select} from 'redux-saga/effects'

let isListened=false

function* screenOrientationMonitor(currentScreenOrientationSettings){
    if(!isListened){
        Orientation.addOrientationListener((orientation)=>{
            logger.debug(_("屏幕方向更改为:{}").params(orientation))
            rootStore.dispatch(screenOrientationChange(orientation))
        })
        isListened=true
    }
    if(currentScreenOrientationSettings==="auto"){
        Orientation.unlockAllOrientations()
    }else if(["LANDSCAPE","LANDSCAPE-LEFT"].includes(currentScreenOrientationSettings)){
        Orientation.lockToLandscapeLeft()
    }else if(currentScreenOrientationSettings==="LANDSCAPE-RIGHT"){
        Orientation.lockToLandscapeRight()
    }else if(currentScreenOrientationSettings==="PORTRAIT"){//竖屏
        Orientation.lockToPortrait()
    }
}

function* takeForScreenOrientation(){
    while(true){
        let action=yield take([LOCK_SCREEN_ORIENTATION,UNLOCK_SCREEN_ORIENTATION,SETTINGS_CHANGE])
        if([LOCK_SCREEN_ORIENTATION,UNLOCK_SCREEN_ORIENTATION] in action.type) {
            break
        }else if(action.type===SETTINGS_CHANGE && "screenOrientation" in action.payload) {
            break
        }
    }
}

 /**
  * 
  * LANDSCAPE-LEFT,LANDSCAPE-RIGHT,PORTRAIT,PORTRAITUPSIDEDOWN,UNKNOWN
 *   侦听屏幕方向变化
 */
export function* screenOrientationMonitorWorkFlow(){
    logger.debug(_('开始侦听屏幕方向变化'))
    while(true){
        ////取得当前屏幕方向的设置值
        let currentScreenOrientationSettings=yield select((state)=>state.settings.screenOrientation)
        //开始侦听
        yield fork(screenOrientationMonitor,currentScreenOrientationSettings)
        //如果侦听到以下事件，或者说屏幕方向参数改变时
        yield takeForScreenOrientation()        
    }
}


