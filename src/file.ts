import { strOrNumType } from "./interface"
import { isNumber, formatNumber } from "./number"

/**
 * @description 文件类型映射表
 * @return {*}
 */
export const fileTypeObj = {
  // word
  doc: 'WORD',
  docx: 'WORD',
  // excel
  xls: 'EXCEL',
  xlsx: 'EXCEL',
  // ppt
  ppt: 'PPT',
  pptx: 'PPT',
  // pdf
  pdf: 'PDF',
  // 图片
  jpg: 'IMAGE',
  jpeg: 'IMAGE',
  png: 'IMAGE',
  bmp: 'IMAGE',
  gif: 'IMAGE',
  // 视频
  mp4: 'VIDEO',
  m2v: 'VIDEO',
  mkv: 'VIDEO',
  rmvb: 'VIDEO',
  wmv: 'VIDEO',
  avi: 'VIDEO',
  flv: 'VIDEO',
  mov: 'VIDEO',
  m4v: 'VIDEO',
  // 音频
  mp3: 'RADIO',
  wma: 'RADIO',
  wav: 'RADIO',
  // 压缩包
  zip: 'ZIP',
  rar: 'ZIP',
  '7z': 'ZIP'
}

/**
 * @description 文件类型枚举
 * @return {*}
 */
export enum fileTypeEnum {
  word = 'WORD',
  excel = 'EXCEL',
  ppt = 'PPT',
  pdf = 'PDF',
  image = 'IMAGE',
  video = 'VIDEO',
  radio = 'RADIO',
  zip = 'ZIP'
}

/**
 * @group 【file】
 * @category 获取文件类型【根据文件名、或File对象的type字段】
 * @param {string} fileName 文件名，或File对象的type字段
 * @param {boolean} onlySuffix 是否只返回后缀名称
 * @return {fileTypeEnum} 文件类型
 */
export const getFileType = (fileName: string, onlySuffix: boolean = false): fileTypeEnum | string => {
  if (!fileName || !fileName.includes('.') || !fileName.includes('/')) {
    return ''
  }
  const fileSuffixArr = fileName.includes('.') ? fileName.split('.') : fileName.split('/')
  if (!fileSuffixArr.length) {
    return ''
  }
  // 先过滤以下，看是否有匹配的
  let fileSuffix = fileSuffixArr[fileSuffixArr.length -1]
  if (fileSuffix) {
    fileSuffix = fileSuffix.toLowerCase()
  }
  if (onlySuffix) {
    return fileSuffix
  }
  return fileTypeObj[fileSuffix] || 'FILE'
}

/**
 * @description 格式化文件size类型
 * @return {*}
 */
export interface formatFileSizeInterface {
  fileSize: strOrNumType // 文件size大小
  decimalNum: number // 是否需要单位
  needUnit?: boolean // 是否需要单位
  separator?: boolean // 是否需要添加千分位
}

/**
 * @group 【file】
 * @category 格式化文件size
 * @param {formatFileSizeInterface} params 文件size大小
 * @return {string} 格式化后的文件size
 */
export const formatFileSize = ({
  fileSize,
  decimalNum = 2,
  needUnit = true,
  separator = false
}: formatFileSizeInterface): string => {
  if (!isNumber(fileSize)) {
    return '未知大小'
  }
  const kb = +fileSize / 1024
  const m = kb / 1024
  const g = kb / 1024
  let unit = ''
  let size = 0
  if (kb < 1024) {
    unit = 'KB'
    size = kb
  } else if (m < 1024) {
    unit = 'M'
    size = m
  } else {
    unit = 'G'
    size = g
  }
  return `${formatNumber(size, decimalNum, separator)}${needUnit ? unit : ''}`
}