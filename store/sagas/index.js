import { all ,fork } from 'redux-saga/effects'
import { connectAllGatewayWorkFlow } from "../../services/gateway/workflow"
import { screenOrientationMonitorWorkFlow } from "../../services/screenOrientation"


export default function* rootSaga() {
    yield all([
      //fork(connectAllGatewayWorkFlow),//连接网关
      fork(screenOrientationMonitorWorkFlow)
    ])
  }