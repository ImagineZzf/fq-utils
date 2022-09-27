import { isEmpty } from "./common"

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