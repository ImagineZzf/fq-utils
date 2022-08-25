/**
 * @description: 获取格林威治时间
 * @param {Date} date 传入日期
 * @return {*}
 */
export const getDate = (date: Date | string | number): Date => {
  if (date instanceof Date) {
    return date
  }
  if (typeof date === 'number') {
    // TODO: 如果是number，增加位数不全
    // TODO: 看看typedoc有没有好看点的主题，看看怎么配置
    return new Date(date)
  }
  if (typeof date === 'string') {
    if (!!date) {
      // TODO: 如果是number字符串，增加位数不全
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