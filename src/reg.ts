
/**
 * @group 【reg】
 * @category 正则表达式合集
 * @return {*}
 */
export const checkExp = {
  email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, // 邮箱
  mobile: /^[1](([3][0-9])|([4][0-9])|([5][0-9])|([6][0-9])|([7][0-9])|([8][0-9])|([9][0-9]))[0-9]{8}$/, // 手机号
  decimal: /^\d+\.?\d{0,2}$/, // 两位小数
  identifier: /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/, // 纳税人识别号
  password: /^[a-zA-Z0-9]{6,16}$/, // 密码
  idChard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/ // 身份证号
}

/**
 * @group 【reg】
 * @category 校验内容格式
 * @param {any} val 传入的内容
 * @param {string} type 要校验的类型
 * @return {boolean} 是否符合格式
 */
export const checkValueFormat = (val: any, type: string = 'mobile'): boolean => {
  if (!checkExp[type]) {
    return false
  }
  return checkExp[type].test(val)
}