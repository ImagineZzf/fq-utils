
/**
 * @description 浏览器类型
 * @return {*}
 */
export enum browerType {
  firefox = 'firefox',
  opera = 'opera',
  ie = 'ie',
  edg = 'edg',
  chrome = 'chrome',
  safari = 'safari',
  weixin = 'weixin'
}

/**
 * @group 【brower】
 * @category 获取浏览器类型
 * @return {browerType}
 */
export const getBrowerType = (): browerType | 'unknown' => {
  if (!hasWindow()) {
    return 'unknown'
  }
  const ua = navigator.userAgent.toLowerCase()
  if (ua.indexOf("firefox") > -1) {
    return browerType.firefox
  } else if (ua.indexOf("opera") > -1 || ua.indexOf("opr") > -1) {
    return browerType.opera
  } else if (ua.indexOf("trident") > -1) {
    return browerType.ie
  } else if (ua.indexOf("edg") > -1) {
    return browerType.edg
  } else if (ua.indexOf("chrome") > -1) {
    return browerType.chrome
  } else if (ua.indexOf("safari") > -1) {
    return browerType.safari
  } else if (ua.indexOf('micromessenger') > -1) {
    return browerType.weixin
  } else {
    return 'unknown'
  }
}

/**
 * @group 【brower】
 * @category 是否是IE浏览器
 * @return {boolean}
 */
export const isIE = (): boolean => {
  return getBrowerType() === browerType.ie
}

/**
 * @group 【brower】
 * @category 是否是Edg浏览器
 * @return {boolean}
 */
export const isEdg = (): boolean => {
  return getBrowerType() === browerType.edg
}

/**
 * @group 【brower】
 * @category 是否是safari浏览器
 * @return {boolean}
 */
export const isSafari = (): boolean => {
  return getBrowerType() === browerType.safari
}

/**
 * @group 【brower】
 * @category 是否是Firefox浏览器
 * @return {boolean}
 */
export const isFirefox = (): boolean => {
  return getBrowerType() === browerType.firefox
}

/**
 * @group 【brower】
 * @category 是否是微信浏览器
 * @return {boolean}
 */
export const isWeixin = (): boolean => {
  return getBrowerType() === browerType.weixin
}

/**
 * @group 【brower】
 * @category 是否是移动端微信浏览器
 * @return {boolean}
 */
export const isMobileWeixin = (): boolean => {
  return isMobile() && getBrowerType() === browerType.weixin
}

/**
 * @group 【brower】
 * @category 是否PC端微信浏览器
 * @return {boolean}
 */
export const isPcWeixin = (): boolean => {
  return !isMobile() && getBrowerType() === browerType.weixin
}

/**
 * @group 【brower】
 * @category 是否移动端浏览器
 * @return {boolean}
 */
export const isMobile = (): boolean => {
  if (!hasWindow()) {
    return false
  }
  return !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
}

/**
 * @group 【brower】
 * @category 是否有window对象
 * @return {boolean}
 */
export const hasWindow = (): boolean => {
  return typeof window !== 'undefined'
}