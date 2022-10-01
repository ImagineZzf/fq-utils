import { getDataType, isEmpty, transfromDataType } from "./common"
import { DATA_LIMIT_NUMBER, DateTimeDiffType, getDate, getTimeDiffAbs, isDate, isLessThanTargetDate } from "./date"
import { baseType, dateType } from "./interface"
import { isNumber } from "./number"

/**
 * @description 存入storage的对象格式
 * @return {*}
 */
export interface storageObj {
  value: baseType,
  date: number
  expire?: dateType,
  type?: string,
}

/**
 * @group 【storage】
 * @category 获取localstorage中的存储的数据
 * @param {string} key 存储数据的key
 * @return {baseType} 返回获取到的value值
 */
export const getStorage = (key: string): baseType => {
  if (typeof window === 'undefined') {
    return
  }
  const value = localStorage.getItem(key)
  const returnEmptyValue = void(0)
  if (isEmpty(value)) {
    return returnEmptyValue
  }
  // 判断得到的value是否可以解析为对象
  try {
    const obj: storageObj = JSON.parse(value)
    // 判断是否有过期时间
    if (obj.hasOwnProperty('expire')) {
      // 判断过期时间是否是日期格式，则判断当前时间是否大于过期时间
      if (isDate(obj.expire) && isLessThanTargetDate(obj.expire)) {
        // 已经过期，则清除该storage
        removeStorage(key)
        return returnEmptyValue
      }
      // 判断过期时间是否是数字【单位：天】，则判断当前时间与存入时间之间的差值，是否大于过期时间
      if (isNumber(obj.expire) && obj.hasOwnProperty('date') && isDate(obj.date) && getTimeDiffAbs(obj.date, new Date(), DateTimeDiffType.NUMBER) > ((obj.expire as number) * (DATA_LIMIT_NUMBER.day as number))) {
        // 已经过期，则清除该storage
        removeStorage(key)
        return returnEmptyValue
      }
    }
    // 如果包含类型字段，且返回的类型不是存储的类型，则将数据格式化为对应的类型
    if (obj.hasOwnProperty('type') && getDataType(obj.value) !== obj.type) {
      return transfromDataType(obj.value, obj.type)
    }
    return obj.value
  } catch (err) {
    return value
  }
}


 /**
  * @group 【storage】
  * @category 向localStorage中存入数据
  * @param {string} key 存储数据的key
  * @param {baseType} value 存入的数据
  * @param {dateType} expire 过期时间，可以传天数或过期时间，默认365天（单位：天），
  * @param {boolean} containType 是否存入数据类型
  * @return {*}
  */
 export const setStorage = (key: string, value: baseType, expire: dateType = 365, containType: boolean = true): void => {
  if (typeof window === 'undefined') {
    return
  }
  const params: storageObj = {
    value,
    date: getDate('').getTime()
  }
  if (expire) {
    params.expire = expire
  }
  if (containType) {
    params.type = getDataType(value)
  }
  localStorage.setItem(key, JSON.stringify(params))
}

/**
 * @group 【storage】
 * @category 移除localStorage中的值
 * @param {string} key 要移除的存储数据key
 * @return {*}
 */
export const removeStorage = (key: string): void => {
  if (typeof window === 'undefined') {
    return
  }
  localStorage.removeItem(key)
}

/**
 * @group 【storage】
 * @category 清除localStorage
 * @return {*}
 */
 export const clearStorage = (): void => {
  if (typeof window === 'undefined') {
    return
  }
  localStorage.clear()
}