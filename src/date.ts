import { reviseLength } from "./common"
import { dateType, strOrNumType } from "./interface"
import { padNumber } from "./number"

/**
 * @group 【date】
 * @category 获取格林威治时间
 * @param {Date} date 传入日期
 * @return {Date} 格林威治时间
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

/**
 * @group 【date】
 * @category 格式化日期
 * @param {dateType} time 要进行格式化的日期数据
 * @param {string} format 格式
 * @param {string} fillZero 是否自动补零，默认自动补零
 * @return {string} 格式化后的日期
 */
export const formatDate = (time: dateType, format: string = 'YYYY-MM-DD HH:mm:ss', fillZero: boolean = true): string => {
  const date = getDate(time)
  const week = ['日', '一', '二', '三', '四', '五', '六']
  return format.replace(/YYYY|yyyy|YY|yy|MM|DD|HH|hh|mm|SS|ss|week/g, (key: string): string => {
    switch (key) {
      case 'YYYY':
      case 'yyyy':
        return date.getFullYear() + ''
      case 'YY':
      case 'yy':
        return (date.getFullYear() + '').slice(2)
      case 'MM':
        return fillZero ? padNumber(date.getMonth() + 1) : date.getMonth() + 1 + ''
      case 'DD':
        return fillZero ? padNumber(date.getDate()) : date.getDate() + ''
      case 'HH':
      case 'hh':
        return fillZero ? padNumber(date.getHours()) : date.getHours() + ''
      case 'mm':
        return fillZero ? padNumber(date.getMinutes()) : date.getMinutes() + ''
      case 'SS':
      case 'ss':
        return fillZero ? padNumber(date.getSeconds()) : date.getSeconds() + ''
      case 'week':
        return week[date.getDay()]
    }
  })
}