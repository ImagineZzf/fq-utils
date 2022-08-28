import { reviseLength } from "./common"
import { dateType } from "./interface"

/**
 * @description: 获取格林威治时间
 * @param {Date} date 传入日期
 * @return {*}
 */
export const getDate = (date: dateType): Date => {
  if (date instanceof Date) {
    return date
  }
  if (typeof date === 'number') {
    // 如果是number，增加位数不全
    return new Date(reviseLength(date, 13))
  }
  if (typeof date === 'string') {
    if (!!date) {
      // 如果是number字符串，增加位数不全
      if (!isNaN(+date)) {
        date = reviseLength(date, 13)
      }
      // eslint-disable-next-line no-useless-escape
      date = (date as string).replace(/\-/g, '/').replace(/\./g, '/')
      let newDate = new Date(date)
      // 这里判断Invalid Date的清空，做浏览器兼容性处理
      if (isNaN(newDate.getTime())) {
        date = date.replace(/\//g, '-')
        newDate = new Date(date)
      }
      return newDate
    }
    return new Date()
  }
  return new Date()
}