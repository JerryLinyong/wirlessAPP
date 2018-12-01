
import "./string"

//提供全局的多语言函数, TODO：暂时未实现
global._=function(value){
    return value
}

//全局日志模块 , TODO：暂时未实现
global.logger={
  info : (text) => {console.info("[INFO ] " + text)},
  log  : (text) => {console.log("[ LOG ] " + text)},
  warn : (text) => {console.warn("[WARN ] " + text)},
  debug: (text) => {console.debug("[DEBUG] " + text)},
  error: (text) => {console.error("[ERROR] " + text)}
}
if (!__DEV__) {
    global.console = {
      info: () => {},
      log: () => {},
      warn: () => {},
      debug: () => {},
      error: () => {}
    };
  }

