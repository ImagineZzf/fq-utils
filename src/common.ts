import { strOrNumType } from "./interface";

/**
 * @description: 开始位置
 * @return {*}
 */
export enum StartPositionEnum {
  START = 'START',
  END = 'END'
}

/**
 * @description: 修正字符串或数字的长度
 * @param {strOrNumType} params 传入的字符串或数字
 * @param {number} len 修正后的长度
 * @param {string} fillText 修正时填充用的字符
 * @param {StartPositionEnum} startPosition 从什么位置开始填充
 * @return {strOrNumType} 返回修正后的字符串或数字
 */
export const reviseLength = <T extends strOrNumType>(params: T, len: number, fillText: string = '0', startPosition: StartPositionEnum = StartPositionEnum.END): strOrNumType => {
  // 获取传入字符串的长度
  let newParams = params + ''
  if (newParams.length >= len) {
    newParams = newParams.slice(0, len)
  } else{
    newParams = startPosition === StartPositionEnum.END ? newParams.padEnd(len, fillText) : newParams.padStart(len, fillText)
  }
  return typeof params === 'number' ? parseInt(newParams) : newParams
}