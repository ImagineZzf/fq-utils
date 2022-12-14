import { isEmpty, reviseLength } from "./common"
import { dateType, strOrNumType, dateInterFace } from "./interface"
import { getNumberLength, padNumber } from "./number"
import { getStringFromObj } from "./string"

/**
 * @group 【date】
 * @category 判断是否是日期格式的数据
 * @param {any} date 传入的数据
 * @return {boolean} 是否是日期格式的数据
 */
export const isDate = (date: any): boolean => {
  if (isEmpty(date)) {
    return false
  }
  if (date instanceof Date) {
    return true
  }
  // 如果是13位纯数字、或10位纯数字
  if (typeof date === 'number' && getNumberLength(date) === 13 || getNumberLength(date) === 10) {
    return true
  }
  // 如果是13位纯数字字符串、或10位纯数字字符串
  if (typeof date === 'string') {
    if (!isNaN(+date) && date.length === 13 || date.length === 10) {
      return true
    }
    const newDate = date.replace(/\-/g, '/').replace(/\./g, '/')
    const newDateTwo = newDate.replace(/\//g, '-')
    if (isNaN(new Date(newDate).getTime()) && isNaN(new Date(newDateTwo).getTime())) {
      return false
    } else {
      return true
    }
  }
  return false
}

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
  const diffTimeAbs = Math.abs(getTimeDiff(firstDate, secondDate))
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

/**
 * @group 【date】
 * @category 获取两个日期之差
 * @param {dateType} firstDate 第一个日期
 * @param {dateType} secondDate 第二个日期，默认当前时间
 * @return {number} 返回两个日期相差的时间
 */
export const getTimeDiff = (firstDate: dateType, secondDate: dateType = new Date()): number => {
  const firstDateTime = getDate(firstDate).getTime()
  const secondDateTime = getDate(secondDate).getTime()
  return firstDateTime - secondDateTime
}

/**
 * @group 【date】
 * @category 判断日期是否比目标日期小
 * @param {dateType} compareDate 要比较的日期
 * @param {dateType} targetDate 目标日期
 * @return {boolean} 是否比目标日期小
 */
export const isLessThanTargetDate = (compareDate: dateType, targetDate: dateType = new Date()): boolean => {
  return getTimeDiff(compareDate, targetDate) < 0
}

/**
 * @group 【date】
 * @category 获取目标日期零点的时间戳
 * @param {dateType} targetDate 目标日期
 * @return {number} 返回目标日期零点的时间戳
 */
export const getZeroEndTimeStamp = (targetDate: dateType = new Date(), returnStamp: boolean = true): dateType => {
  const newDate = getDate(targetDate)
  newDate.setHours(0, 0, 0, 0)
  if (!returnStamp) {
    return newDate
  }
  return newDate.getTime()
}

/**
 * @description 日期文案显示的分秒类型
 * @return {*}
 */
export enum dateTextMinuteSecondsTypeType {
  noNeed = 0, // 不需要显示分秒
  needAbout = 1, // 需要显示几分钟前、几小时前（当天的）
  needDetail = 2, // 需要显示具体的分秒
}
/**
 * @description 日期展示文案类型
 * @return {*}
 */
export interface dateTextInterface {
  targetDate: dateType
  minuteSecondsType?: dateTextMinuteSecondsTypeType // 日期文案显示的分秒类型，0--不需要分秒，1--显示几分钟前，几小时前（当天的），2--显示具体的分秒
  format?: string
  monthDayFormat?: string,
  hoursMinuteFormat?: string
}

/**
 * @group 【date】
 * @category 获取日期展示文案
 * @param {dateTextInterface} 参数
 * @return {string} 处理后的日期展示文案
 */
export const getDateText = ({
  targetDate,
  minuteSecondsType = dateTextMinuteSecondsTypeType.needAbout,
  format = 'YYYY-MM-DD',
  monthDayFormat = 'MM-DD',
  hoursMinuteFormat = 'HH:ss'
}: dateTextInterface): string => {
  const targetTime = getDate(targetDate)
  const targetTimeStamp = targetTime.getTime() // 要处理的日期时间戳
  const currentTime = new Date()
  const currentTimeStamp = currentTime.getTime() // 当前日期时间戳
  const currentZeroEndTimeStamp = getZeroEndTimeStamp() as number; // 当前日期零点的时间戳
  const timeDiff = (currentTimeStamp - targetTimeStamp) / +DATA_LIMIT_NUMBER.second // 取当前时间戳与目标时间戳的差值
  const dayDiff = Math.ceil((currentZeroEndTimeStamp - targetTimeStamp) / +DATA_LIMIT_NUMBER.day) //  取当日零点时间戳与目标时间戳的差值
  const dayDiffAbs = Math.abs(dayDiff)
  const week = ['一', '二', '三', '四', '五', '六', '日']
  let todayInWeek = currentTime.getDay()
  if (todayInWeek === 0) {
    todayInWeek = 7
  }
  let tip = ''
  // 今天及未来时间
  if (targetTimeStamp >= currentZeroEndTimeStamp) {
    // 在今天0点-当前时间戳范围内的日期
    if (targetTimeStamp <= currentTimeStamp && minuteSecondsType === dateTextMinuteSecondsTypeType.needAbout) {
      if (Math.floor(timeDiff / 60) <= 0) {
        // 1分钟内
        return '刚刚'
      } else if (timeDiff < 3600) {
        // 1小时内
        return Math.floor(timeDiff / 60) + '分钟前'
      } else {
        return Math.floor(timeDiff / 3600) + '小时前'
      }
    }
    if (dayDiffAbs === 0) {
      tip = '今天'
    } else if (dayDiffAbs === 1) {
      tip = '明天'
    } else if (dayDiffAbs <= 7 - todayInWeek) {
      tip = `周${week[todayInWeek + dayDiffAbs - 1]}`
    }
  } else {
    // 昨天及以前
    if (dayDiff === 1) {
      tip = ' 昨天'
    } else if (dayDiff < todayInWeek) {
      tip = `周${week[todayInWeek - dayDiff - 1]}`
    }
  }

  if (!tip) {
    if (currentTime.getFullYear() !== targetTime.getFullYear()) {
      // 如果跨年
      tip = formatDate(targetTime, format)
    } else {
      tip = formatDate(targetTime, monthDayFormat)
    }
  }

  if (minuteSecondsType !== dateTextMinuteSecondsTypeType.noNeed) {
    tip = `${tip} ${formatDate(targetTime, hoursMinuteFormat)}`
  }

  return tip
}
/**
 * @group 【date】
 * @category 获取某个月有多少天
 * @param {dateType} targetDate 目标日期
 * @return {number} 返回天数
 */
export const getDaysOfMonth = (targetDate: dateType = new Date()): number => {
  const newDate = getDate(targetDate)
  newDate.setMonth(newDate.getMonth() + 1, 0)
  return newDate.getDate()
}

/**
 * @group 【date】
 * @category 获取目标日期N天后或N天前的日期
 * @param {number} day 天数【可正可负】，如果为负数，则为N天前的日期
 * @param {dateType} targetDate 目标日期
 * @param {string} format 日期格式
 * @return {string} 格式化后的N天后的日期
 */
export const getDateAfterDay = (day: number, targetDate: dateType = new Date(), format: string = 'YYYY-MM-DD'): string => {
  const newDate = getDate(targetDate)
  newDate.setDate(newDate.getDate() + parseInt(day + ''))
  return formatDate(newDate, format)
}

/**
 * @description 年龄比较精度
 * @return {*}
 */
export enum ageComparePrecision {
  year = 'year',
  month = 'month',
  day = 'day'
}

/**
 * @group 【date】
 * @category 获取年龄大小
 * @param {dateType} birthDay 出生日期
 * @return {number} 返回年龄
 */
export const getAge = (birthDay: dateType, comparePrecision: ageComparePrecision = ageComparePrecision.year): number => {
  const birthDate = getDate(birthDay) // 出生日期
  const currentDate = new Date() // 当前日期
  let age = currentDate.getFullYear() - birthDate.getFullYear()
  switch(comparePrecision) {
    case ageComparePrecision.month:
      if (currentDate.getMonth() < birthDate.getMonth()) {
        age--
      }
      break;
    case ageComparePrecision.day:
      if (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate()) {
        age--
      }
      break;
    default:
      break;
  }

  return age
}