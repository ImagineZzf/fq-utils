import { getDataType } from "./common"

/**
 * @group 【string】
 * @category 根据对象及映射字段，得到一个拼接后的字符串
 * @param {dataObj} 传入的对象数据
 * @param {unitObj} 传入的和对象数据一样结构的映射字段
 * @return {*} 返回拼接后的字符串
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