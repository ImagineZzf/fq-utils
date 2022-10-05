import { getDataType, isEmpty } from "./common"

/**
 * @group 【array】
 * @category 是否是数组
 * @param {any} params 传入的内容
 * @param {number} num 数组长度是否超过该数值
 * @return {boolean} 是否是数组
 */
 export const isArray = (params: any, num: number = -1): boolean => {
  if (isEmpty(params) || getDataType(params) !== 'array') {
    return false
  }
  return params.length > num
}

/**
 * @group 【array】
 * @category 根据数字得到数组
 * @param {number} params 传入的数字
 * @return {number[]} 返回的数组
 */
export const getArrayFromNumber = (params: number): number[] => {
  return Array.from({length: params}).map((item, index) => index + 1)
}