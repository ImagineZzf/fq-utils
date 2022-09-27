import { strOrNumType, CASE_TYPE } from "./interface";

/**
 * @description 开始位置
 * @return {*}
 */
export enum StartPositionEnum {
  START = 'START',
  END = 'END'
}

/**
 * @group 【public】
 * @category 修正字符串或数字的长度
 * @param {strOrNumType} params 传入的字符串或数字
 * @param {number} len 修正后的长度
 * @param {string} fillText 修正时填充用的字符
 * @param {StartPositionEnum} startPosition 从什么位置开始填充
 * @return {strOrNumType} 返回修正后的字符串或数字
 */
export const reviseLength = <T extends strOrNumType>(params: T, len: number, fillText: string = '0', startPosition: StartPositionEnum = StartPositionEnum.END): strOrNumType => {
  // 获取传入字符串的长度
  let newParams = params + ''
  if (newParams.length >= len) {
    newParams = newParams.slice(0, len)
  } else{
    newParams = startPosition === StartPositionEnum.END ? newParams.padEnd(len, fillText) : newParams.padStart(len, fillText)
  }
  return typeof params === 'number' ? parseInt(newParams) : newParams
}

/**
 * @group 【public】
 * @category 获取数据类型
 * @param {any} data 传入的数据
 * @param {CASE_TYPE} caseType 返回的字符串全部小写、或全部大写
 * @return {*} 返回数据类型字符串
 */
export const getDataType = (data: any, caseType: CASE_TYPE = CASE_TYPE.LOWER): string => {
  const type = Object.prototype.toString.call(data).match(/\s+(\S*)\]/)[1]
  return caseType === CASE_TYPE.LOWER ? type.toLowerCase() : caseType === CASE_TYPE.UPPER ? type.toUpperCase() : type
}

/**
 * @group 【public】
 * @category 判断是否是null
 * @param {any} params 传入的数据
 * @return {*} 返回是否是null
 */
export const isNull = (params: any): boolean => {
  return getDataType(params) === 'null'
}

/**
 * @group 【public】
 * @category 判断是否是undefined
 * @param {any} params 传入的数据
 * @return {*} 返回是否是undefined
 */
export const isUndefined = (params: any): boolean => {
  return getDataType(params) === 'undefined'
}

/**
 * @group 【public】
 * @category 判断是否是空（空字符串\null\undefined）
 * @param {any} params 传入的数据
 * @return {*} 返回是否是空
 */
export const isEmpty = (params): boolean => {
  return params === '' || isNull(params) || isUndefined(params)
}