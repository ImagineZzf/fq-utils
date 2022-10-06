import { isEmpty } from "./common"
import { strOrNumType } from "./interface"

/**
 * @group 【number】
 * @category 判断是否是number（纯数字字符串也算number）
 * @param {any} params 传入的内容
 * @return {boolean} 是否是number
 */
export const isNumber = (params: any): boolean => {
  if (isEmpty(params) || (typeof params !== 'number' && typeof params !== 'string')) {
    return false
  }
  return !isNaN(+params)
}

/**
 * @group 【number】
 * @category 数字小于10进行自动补零
 * @param {number} params 要补零的数字
 * @return {string} 补零后的数字
 */
export const padNumber = (params: number): string => (params < 10 ? '0' + params : params + '')

/**
 * @group 【number】
 * @category 获取数字的长度
 * @param {number} params 传入的数字
 * @return {number} 数字的长度
 */
export const getNumberLength = (params: number): number => (params + '').length

/**
 * @group 【number】
 * @category 保留小数
 * @param {number} params 传入的数字
 * @param {number} decimalNum 小数位数，默认两位
 * @return {number} 保留小数后的位数
 */
export const numberToFiexd = (params: number, decimalNum: number = 2): number => {
  if (!isNumber(params)) {
    throw new Error('不是数字')
  }
  return Math.round(+params * Math.pow(10, decimalNum)) / Math.pow(10, decimalNum)
}

/**
 * @group 【number】
 * @category 数字增加千分位
 * @param {number} params 传入的数字
 * @param {number} decimalNum 小数位数，默认0位
 * @return {string} 增加千分位后的数字
 */
export const numberAddThousandSeparator = (params: number, decimalNum: number = 0): string => {
  const parts = (numberToFiexd(params, decimalNum) + '').split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

/**
 * @group 【number】
 * @category 格式化数字
 * @param {number} params 传入的数字
 * @param {number} decimalNum 小数位数，默认2位
 * @param {boolean} needThousandSeparator 是否需要增加千分位
 * @return {strOrNumType} 格式化后的数字【如果增加千分位，则返回string】
 */
export const formatNumber = (params: number, decimalNum: number = 2, needThousandSeparator: boolean = false): strOrNumType => {
  return needThousandSeparator ? numberAddThousandSeparator(params, decimalNum) : numberToFiexd(params, decimalNum)
}