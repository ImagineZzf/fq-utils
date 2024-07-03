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

/**
 * @group 【array】
 * @category 将一维数组转换成树状tree结构
 * @param params  传入的数组
 * @param key 唯一code
 * @param parentKey 父节点字段
 * @param childrenKey 子节点字段
 * @returns 
 */
export const getTreeFromArray = (params: any[], key = 'code', parentKey = 'parent', childrenKey = 'children'): any[] => {
  if (!isArray(params, 0)) {
    return []
  }
  const treeData = []
  const treeMap = {}
  params.map((item, index)=>{
    treeMap[item[key]] = index
    item[childrenKey] = []
    if(!item[parentKey]){
      treeData.push(item) 
    }
  })
  params.map((item, index)=>{
    if (item[parentKey]) {
      params[treeMap[item[parentKey]]][childrenKey].push(item)
    }
  })
  return treeData
}