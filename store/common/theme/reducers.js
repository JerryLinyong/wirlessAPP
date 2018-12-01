/*
    dark (boolean)    : whether this is a dark theme or light theme.
    roundness (number): 通用圆角大小 roundness of common elements, such as buttons.
    colors (object)   : various colors used throught different elements.
        primary     : 主色调 
        accent      : 次色调 
        background  : 背景色，用于每个页面，一般使用白色或浅白色  
        surface     : 元素背景色，用于像卡片 background color for elements containing content, such as cards.
        text        : 默认的文本颜色 ，一般是深灰色 text color for content.
        disabled    : 禁用时的颜色 color for disabled elements.
        placeholder : 占位符颜色  color for placeholder text, such as input placeholder.
        backdrop    : 组件遮掩色，比如模窗口显示时的背景色，color for backdrops of various components such as modals.
        title       : 标题颜色，用于在主色标题栏区别的文本或图标颜色，一般在
        press       : 按钮按下的颜色，包括波纹色
        tint        : 浅色，用来在浅色背景显示文本内容
    fonts (object)    : various fonts used throught different elements.
        regular    : 主字体{}
        medium     : 中
        light
        thin
*/

import { handleActions } from "redux-actions"
import { CHANGE_THEME } from "./actionTypes"

const themes={
    default:require("../../../assets/themes/default").default,
    red:require("../../../assets/themes/red").default,
}


export default handleActions({
    //改变主题 payload   = <主题名称>
    [CHANGE_THEME] : () => action.payload || "default"
},themes.default)