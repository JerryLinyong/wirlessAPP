

let ParamRegExp=/\{\w*\}/g

//添加一个params参数，使字符串可以进行变量插值替换，
// "this is {a}+{b}".params({a:1,b:2}) --> this is 1+2
// "this is {a}+{b}".params(1,2) --> this is 1+2
String.prototype.params=function (params) {
    let result=this
    if(typeof params === "object"){
        for(let name in params){
            result=result.replace("{"+ name +"}",params[name])
        }
    }else{
        let i=0
        for(let match of result.match(ParamRegExp) || []){
            if(i<arguments.length){
                result=result.replace(match,arguments[i])
                i+=1
            }
        }
    }
    return result
}
/**
 * 首字母大写
 * @constructor
 */
String.prototype.firstUpper=function () {
    return this.charAt(0).toUpperCase()+this.substring(1)
}
//输出width个字符，S左对齐，不足部分用fillchar填充，默认的为空格。
String.prototype.ljust=function (width,fillchar=" ") {
    let s=this
    return s+new Array(width-s.length).join(fillchar)
}
String.prototype.rjust=function (width,fillchar=" ") {
    let s=this
    return new Array(width-s.length).join(fillchar)+s
}
String.prototype.center=function (width,fillchar=" ") {
    let s=this
    let llength=parseInt((width-s.length)/2)
    return new Array(llength).join(fillchar)+s+new Array(width-s.length-llength).join(fillchar)
}