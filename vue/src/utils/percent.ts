/** 计算几个正数百分占比 */
export const getPercentByNums = (nums: number[], fixedBit: number = 2) => {
  const sum = nums.reduce((a, b) => +a.toFixed(fixedBit) + +b.toFixed(fixedBit), 0)
  const percentArr = nums.map((num) => Math.round((num / sum) * 10000) / 100)
  const total = percentArr.reduce((a, b) => a + b, 0)
  if (total !== 100) {
    const diff = 100 - total
    percentArr.map((percent) => (percent === Math.max(...percentArr) ? percent + diff : percent))
  }
  return percentArr
}
