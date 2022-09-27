/**
 * @description 字符串或数字类型
 * @return {*}
 */
export type strOrNumType = string | number


/**
 * @description 日期常用格式类型
 * @return {*}
 */
export type dateType = Date | strOrNumType

/**
 * @description 日期对象
 * @return {*}
 */
 export interface dateInterFace {
  year?: strOrNumType,
  month?: strOrNumType,
  day?: strOrNumType,
  hour?: strOrNumType
  minute?: strOrNumType
  second?: strOrNumType
}

/**
 * @description 大小写类型
 * @return {*}
 */
export enum CASE_TYPE {
  LOWER = 'lower',
  UPPER = 'upper'
}
/**
 * @description js包含的基础数据类型
 * @return {*}
 */
export type baseType = number | string | boolean | null | undefined | any[] | object | symbol