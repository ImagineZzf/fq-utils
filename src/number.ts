
/**
 * @description: 数字小于10进行自动补零
 * @param {number} params 要补零的数字
 * @return {string} 补零后的数字
 */
export const padNumber = (params: number): string => (params < 10 ? '0' + params : params + '')