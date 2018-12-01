/**
 * 
 * 存放公共动作
 * 
 */

import { CHANGE_THEME } from "./actionTypes"


/**
 * 改变主题
 */
export function changeTheme(theme) {
    return {
      type: CHANGE_THEME,
      theme:theme
    }
  }