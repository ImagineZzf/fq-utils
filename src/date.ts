/**
 * 获取格林威治时间
 * @param date 传入日期
 * @returns
 */
export const getDate = (date: Date | string | number): Date => {
  if (date instanceof Date) {
    return date
  }
  if (typeof date === 'number') {
    return new Date(date)
  }
  if (typeof date === 'string') {
    if (!!date) {
      // eslint-disable-next-line no-useless-escape
      date = date.replace(/\-/g, '/').replace(/\./g, '/')
      let newDate = new Date(date)
      // 这里判断Invalid Date的清空，做浏览器兼容性处理
      if (isNaN(newDate.getTime())) {
        date = date.replace(/\//g, '-')
        newDate = new Date(date)
      }
      return newDate
    }
    return new Date()
  }
  return new Date()
}