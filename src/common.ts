import { hasWindow } from "./brower";
import { strOrNumType, CASE_TYPE, baseType } from "./interface";

/**
 * @description 开始位置
 * @return {*}
 */
export enum StartPositionEnum {
  START = 'START',
  END = 'END'
}

/**
 * @group 【public】
 * @category 修正字符串或数字的长度
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

/**
 * @group 【public】
 * @category 获取数据类型
 * @param {any} data 传入的数据
 * @param {CASE_TYPE} caseType 返回的字符串全部小写、或全部大写
 * @return {*} 返回数据类型字符串
 */
export const getDataType = (data: any, caseType: CASE_TYPE = CASE_TYPE.LOWER): string => {
  const type = Object.prototype.toString.call(data).match(/\s+(\S*)\]/)[1]
  return caseType === CASE_TYPE.LOWER ? type.toLowerCase() : caseType === CASE_TYPE.UPPER ? type.toUpperCase() : type
}

/**
 * @group 【public】
 * @category 判断是否是null
 * @param {any} params 传入的数据
 * @return {*} 返回是否是null
 */
export const isNull = (params: any): boolean => {
  return getDataType(params) === 'null'
}

/**
 * @group 【public】
 * @category 判断是否是undefined
 * @param {any} params 传入的数据
 * @return {*} 返回是否是undefined
 */
export const isUndefined = (params: any): boolean => {
  return getDataType(params) === 'undefined'
}

/**
 * @group 【public】
 * @category 判断是否是空（空字符串\null\undefined）
 * @param {any} params 传入的数据
 * @return {*} 返回是否是空
 */
export const isEmpty = (params): boolean => {
  return params === '' || isNull(params) || isUndefined(params)
}

/**
 * @group 【public】
 * @category 转换基础数据类型
 * @param {baseType} params 要转换的数据
 * @param {baseType} target 目标数据类型
 * @return {*} 转换后的数据
 */
export const transfromDataType = <T extends Exclude<baseType, symbol>>(params: baseType, targetType: T): Exclude<baseType, symbol> => {
  const paramsDataType = getDataType(params)
  if (paramsDataType === targetType) {
    return (params as T)
  }
  let targetValue: Exclude<baseType, symbol>
  switch(targetType) {
    case 'number':
      targetValue = +(params as T)
      break;
    case 'string':
      targetValue = (params as T) + ''
      break;
    case 'boolean':
      targetValue = !!params
      break;
    case 'array':
      targetValue = [params]
      break;
    case 'null':
      targetValue = null
      break;
    case 'undefined':
      targetValue = void(0)
      break;
    default:
      targetValue = null
      break;
  }
  return targetValue
}

/**
 * @group 【public】
 * @category 函数节流
 * @param {number} delay 延时时间
 * @param {boolean | Function} noTrailing
 * @param {boolean | Function} callback 回调函数
 * @param {boolean | Function} debounceMode 是否立即执行
 * @return {Function} 返回的节流函数
 */
export function throttle(delay: number, noTrailing: boolean | Function, callback?: boolean | Function, debounceMode?: boolean | Function): Function {
  let timeoutID: any; // 定时器id
  let cancelled = false; // 是否已经取消
  let lastExec = 0; // 最后一次触发的时间
  // 清除定时器
  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  }
  // 取消操作
  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  }
  // 将参数进行更换
  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  function wrapper(...arguments_) {
    let self = this;
    let elapsed = Date.now() - lastExec; // 距离最后一次触发的时间间隔

    if (cancelled) {
      return;
    }
    // 触发回调函数
    function exec() {
      lastExec = Date.now();
      if (typeof callback === 'function') {
        callback.apply(self, arguments_);
      }
    }
    function clear() {
      timeoutID = undefined;
    }
    // 如果立即触发，则直接先触发一次回调
    if (debounceMode && !timeoutID) {
      exec();
    }
    clearExistingTimeout();
    // 如果不是立即触发，则等触发间隔大于设置的时间时，进行触发
    if (debounceMode === undefined && elapsed > delay) {
      exec();
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(
        debounceMode ? clear : exec,
        debounceMode === undefined ? delay - elapsed : delay
      );
    }
  }
  wrapper.cancel = cancel;
  return wrapper;
}

/**
 * @group 【public】
 * @category 函数防抖
 * @param {number} delay 延时时间
 * @param {boolean | Function} atBegin 是否立即触发
 * @param {Function} callback 回调函数
 * @return {Function} 返回防抖函数
 */
export function debounce(delay: number, atBegin: boolean | Function, callback?: Function): Function {
  return callback === undefined
    ? throttle(delay, atBegin, false)
    : throttle(delay, callback, atBegin !== false);
}

//复制到剪贴板
function copyByExecCommand(textToCopy: string) {
  const inputElement = document.createElement('textarea');
  inputElement.value = textToCopy;

  inputElement.style.top = '0';
  inputElement.style.left = '0';
  inputElement.style.position = 'fixed';

  document.body.appendChild(inputElement);
  inputElement.focus();
  inputElement.select();

  const successful = (() => {
    try {
      return document.execCommand('copy');
    } catch (e) {
      console.error(e);
      return false;
    }
  })();

  document.body.removeChild(inputElement);

  return successful;
}

/**
 * @group 【public】
 * @category 复制到剪贴板
 * @param {string} textToCopy 要复制的文字
 * @return {*}
 */
export const copyToClipboard = async(textToCopy: string) => {
  if (!hasWindow()) {
    return false
  }
  if (!navigator.clipboard) {
    return copyByExecCommand(textToCopy);
  }

  try {
    await navigator.clipboard.writeText(textToCopy);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

/**
 * @group 【public】
 * @category 获取序列化字符串中的参数，默认返回全部参数的对象格式
 * @param {string} params 需要查询的key
 * @param {string} searchUrl 字符串，默认为location.search
 * @return {string | object} 返回对应key的value，默认返回key、value键值对的对象格式
 */
export const getQueryParams = (params: string, searchUrl?: string): string | object => {
  // 如果searchUrl不存在，且window存在，则将location.search设置为默认值
  if (isEmpty(searchUrl)) {
    if (!hasWindow()) {
      return !!params ? '' : {}
    } else {
      searchUrl = window.location.search
    }
  }
  const startIndex = searchUrl.indexOf('?')
  const query = startIndex > 0 ? searchUrl.substring(startIndex) : searchUrl
  const queryArr = query.split('&')
  if (!!params) {
    for (const item of queryArr) {
      const paramsArr = item.split('=')
      if (paramsArr[0] === params) {
        return paramsArr[1]
      }
    }
    return ''
  }
  const allParams = {}
  for (const item of queryArr) {
    const paramsArr = item.split('=')
    allParams[paramsArr[0]] = paramsArr[1] || ''
  }
  return allParams
}

/**
 * @group 【public】
 * @category 对象转为url格式
 * @param {object} params 对象格式
 * @param {string} firstStr 第一个字符，默认为：?
 * @param {string} separator 分隔符，默认为：&
 * @param {Function} filterFunction 自定义过滤函数
 * @return {string} 返回的url
 */
export const objToUrl = (params: object, firstStr: string = '?', separator: string = '&', filterFunction?: Function): string => {
  if (getDataType(params) !== 'object') {
    return ''
  }
  const urlArr = []
  // 是否有自定义过滤函数
  const hasFilter = getDataType(filterFunction) === 'function'
  // 只保留value为string格式的内容
  const filterKeys = 
    hasFilter ? 
      Object.keys(params).filter(item => filterFunction(item))
      :
      Object.keys(params).filter(item => typeof params[item] === 'string')
  filterKeys.forEach((item) => {
    urlArr.push(`${item}=${params[item]}`)
  })
  const url = urlArr.join(separator)
  if (!url) {
    return ''
  }
  return firstStr ? `${firstStr}${url}` : url
}