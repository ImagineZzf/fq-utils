
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
 * @param {string} fileName 
 * @return {fileTypeEnum} 文件类型
 */
export const getFileType = (fileName: string): fileTypeEnum | '' => {
  if (!fileName || !fileName.includes('.') || !fileName.includes('/')) {
    return ''
  }
  const fileSuffixArr = fileName.includes('.') ? fileName.split('.') : fileName.split('/')
  if (!fileSuffixArr.length) {
    return ''
  }
  // 先过滤以下，看是否有匹配的
  const fileSuffix = fileSuffixArr[fileSuffixArr.length -1]
  return fileTypeObj[fileSuffix] || 'FILE'
}