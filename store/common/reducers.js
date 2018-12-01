import { combineActions } from "redux-actions"

const homeState={//首页

}    

const messages={//消息 

}
const statistics={//统计

}
const map={//地图

}
const settings={//设置

}

const initCommonState={
    ...home,
    ...messages,
    ...map,
    ...statistics,
    ...settings
}

const themeReducers=require("./theme/reducers")
const redtipsReducers=require("./redtips/reducers")

const reducers=combineActions(...themeReducers,...redtipsReducers)

export default reducers