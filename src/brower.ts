
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
  safari = 'safari'
}

/**
 * @group 【brower】
 * @category 获取浏览器类型
 * @return {browerType}
 */
export const getBrowerType = (): browerType | 'unknown' => {
  if (typeof window === 'undefined') {
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
  } else {
    return 'unknown'
  }
}

/**
 * @group 【brower】
 * @category 是否是IE浏览器
 * @return {*}
 */
export const isIE = () => {
  return getBrowerType() === browerType.ie
}

/**
 * @group 【brower】
 * @category 是否是Edg浏览器
 * @return {*}
 */
export const isEdg = () => {
  return getBrowerType() === browerType.edg
}

/**
 * @group 【brower】
 * @category 是否是safari浏览器
 * @return {*}
 */
export const isSafari = () => {
  return getBrowerType() === browerType.safari
}

/**
 * @group 【brower】
 * @category 是否是Firefox浏览器
 * @return {*}
 */
export const isFirefox = () => {
  return getBrowerType() === browerType.firefox
}

/**
 * @group 【brower】
 * @category 是否移动端浏览器
 * @return {*}
 */
export const isMobile = () => {
  if (typeof window === 'undefined') {
    return false
  }
  return !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
}