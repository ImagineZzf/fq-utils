import { isEmpty } from "./common"
import { baseType } from "./interface"

/**
 * @group 【public】
 * @category 获取localstorage中的存储的数据
 * @param {string} key 存储数据的key
 * @return {baseType} 返回获取到的value值
 */
export const getStorage = (key: string = 'token'): baseType => {
  if (!window) {
    return
  }
  const value = localStorage.getItem(key)
  if (isEmpty(value)) {
    return null
  }
  // 判断得到的value是否可以解析为对象
  try {
    const obj = JSON.parse(value)
    // 判断是否有过期时间
    if (obj.hasOwnProperty('expire')) {
      // 判断过期时间的类型
      // TODO: 判断过期时间是否是数字，做对应的处理

      // TODO: 判断过期时间是否是日期格式，做对应的处理
      
    }
    // TODO: 如果包含类型字段，则将数据格式化为对应的类型
    if (obj.hasOwnProperty('type')) {

    }
    return obj.value
  } catch (err) {
    return value
  }
}