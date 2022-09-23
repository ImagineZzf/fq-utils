import { reviseLength } from "./common"
import { dateType, strOrNumType, dateInterFace } from "./interface"
import { padNumber } from "./number"
import { getStringFromObj } from "./string"

/**
 * @group 【date】
 * @category 获取格林威治时间
 * @param {dateType} date 传入日期
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

/**
 * @group 【常量】
 * @description 日期单位映射关系
 * @return {*}
 */
export const DATA_UNIT: dateInterFace = {
  year: '年',
  month: '月',
  day: '日',
  hour: '小时',
  minute: '分',
  second: '秒'
}

/**
 * @group 【常量】
 * @description 日期临界值映射关系
 * @return {*}
 */
 export const DATA_LIMIT_NUMBER: dateInterFace = {
  year: 31536000000, // 1000 * 60 * 60 * 24 * 365
  month: 2592000000, // 1000 * 60 * 60 * 24 * 30
  day: 86400000, // 1000 * 60 * 60 * 24
  hour: 3600000, // 1000 * 60 * 60
  minute: 60000, // 1000 * 60
  second: 1000 // 1000
}

/**
 * @description 日期差返回的格式类型枚举
 * @return {*}
 */
export enum DateTimeDiffType {
  DATEOBJ = 'obj',
  STRING = 'string',
  NUMBER = 'number'
}

/**
 * @group 【date】
 * @category 获取两个日期之差（绝对值）
 * @param {dateType} firstDate 第一个日期
 * @param {dateType} secondDate 第二个日期，默认当前时间
 * @param {dateType} returnType 返回数据的类型
 * @return {dateInterFace | strOrNumType} 返回两个日期相差的时间
 */
export const getTimeDiffAbs = (firstDate: dateType, secondDate: dateType = new Date(), returnType: DateTimeDiffType = DateTimeDiffType.STRING): dateInterFace | strOrNumType => {
  const firstDateTime = getDate(firstDate).getTime()
  const secondDateTime = getDate(secondDate).getTime()
  const diffTimeAbs = Math.abs(firstDateTime - secondDateTime)
  // 如果是返回数字类型，则将相差的时间戳直接返回
  if (returnType === DateTimeDiffType.NUMBER) {
    return diffTimeAbs
  }
  const dateTimeDiffObj: dateInterFace = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  }
  // 临时处理的时间差值
  let diffTimeTemp = diffTimeAbs
  // 判断时间差是否超过每个阶段的临界值，超过则进行处理
  Object.keys(dateTimeDiffObj).forEach(item => {
    if (diffTimeTemp > DATA_LIMIT_NUMBER[item]) {
      dateTimeDiffObj[item] = Math.floor(diffTimeTemp / DATA_LIMIT_NUMBER[item])
      diffTimeTemp = diffTimeTemp % DATA_LIMIT_NUMBER[item]
    }
  })
  if (returnType === DateTimeDiffType.DATEOBJ) {
    return dateTimeDiffObj
  }
  return getStringFromObj(dateTimeDiffObj, DATA_UNIT)
}