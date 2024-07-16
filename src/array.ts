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
 * @returns 树状tree数组
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

/**
 * @group 【array】
 * @category 将tree数组转换成一维数组
 * @param params 传入的tree数组
 * @param childrenKey 子节点字段
 * @returns 一维数组
 */
export const getArrayFromTree = (params: any[], childrenKey = 'children') => {
  if (!isArray(params, 0)) {
    return []
  }
  const list = []
  const queue = [...params]
  while(queue.length) {
    const node = {...queue.shift()}
    const children = node[childrenKey]
    if(children) {
      queue.push(...children)
    }
    delete node[childrenKey]
    list.push(node)
  }
  return list
}

/**
 * @group 【array】
 * @category 从tree数组中过滤需要的数据
 * @param treeData 
 * @param predicate 
 * @param childrenKey 
 * @returns 过滤后的数据
 */
export const filterTree = (treeData: any[], predicate: any = () => true, childrenKey = 'children') => {
  const result = [] // 最终结果
  const temp = [] // 临时数据

  function deepFilter(arr: any[]) {
    for(let i = 0, len = arr.length; i < len; i++) {
      if (predicate(arr[i])) {
        if (temp.length) {
          result.push(...temp)
        }
        // 如果符合条件，则直接结束
        result.push(arr[i])
        break;
      }
      // 不符合条件，则判断是否有children
      if (arr[i][childrenKey] && Array.isArray(arr[i][childrenKey])) {
        temp.push(arr[i])
        deepFilter(arr[i][childrenKey])
      }
    }
  }

  deepFilter(treeData)

  return result
}