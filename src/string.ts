import { getDataType } from "./common"
import { isNumber } from "./number"

/**
 * @group 【string】
 * @category 是否是字符串
 * @param {any} params 传入的内容
 * @return {boolean} 返回是否是字符串
 */
export const isString = (params: any): boolean => {
  return typeof params === 'string'
}

/**
 * @group 【string】
 * @category 根据对象及映射字段，得到一个拼接后的字符串
 * @param {dataObj} 传入的对象数据
 * @param {unitObj} 传入的和对象数据一样结构的映射字段
 * @return {string} 返回拼接后的字符串
 */
export const getStringFromObj = <T extends object>(dataObj: T, unitObj: T): string => {
  if (getDataType(dataObj) !== 'object') {
    return ''
  }
  let result = ''
  Object.keys(dataObj).forEach(item => {
    result+= `${dataObj[item]}${unitObj[item]}`
  })
  return result
}

export interface stringEncryInterface {
  text: string
  start?: number
  end?: number
  encryStr?: string
  encryStrLength?: number
}

/**
 * @group 【string】
 * @category 字符串加密处理
 * @param {string} text 传入的字符串
 * @param {number} start 开始加密的位置索引值，默认为0
 * @param {number} end 结束加密的位置索引值，默认为0，如果为负数，则从末尾开始算起
 * @param {string} encryStr 加密字符，默认为：*
 * @param {number} encryStrLength 加密字符长度，默认为start与end之差，如果指定，则以start+encryStrLength进行加密字符
 * @return {string} 返回加密后的字符串
 */
export const stringEncry = ({
  text,
  start = 0,
  end = 0,
  encryStr = '*',
  encryStrLength
}: stringEncryInterface): string => {
  if (!isString(text)) {
    return ''
  }
  const textLength = text.length
  const endIndexAbs = Math.abs(end)
  // 如果开始位置、结束位置大于文本长度，则返回原字符串
  if (start < 0 || start > textLength || endIndexAbs > textLength) {
    return text
  }
  let encryStartIndex = start // 加密开始位置
  let encryLength = 0 // 加密长度
  // 如果指定了加密长度，则使用指定的加密长度
  if (!!encryStrLength && isNumber(encryStrLength)) {
    if (encryStartIndex + encryStrLength > textLength) {
      encryLength = textLength - encryStartIndex
    } else {
      encryLength = encryStrLength
    }
  } else {
    if (end > 0) {
      encryLength = Math.abs(start - end)
    } else {
      if (textLength - start < endIndexAbs) {
        encryStartIndex = textLength - endIndexAbs
      }
      encryLength = Math.abs(start - (textLength - endIndexAbs))
    }
  }
  return `${text.slice(0, encryStartIndex)}${encryStr.repeat(encryLength)}${text.slice(encryStartIndex + encryLength)}`
}