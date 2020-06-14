const fse = require('fs-extra')
const path = require('path')

const fileType = 'UTF8'

const handleFilePath = (filename) =>
  path.resolve(__dirname, '../source', `${filename}.csv`)

/**
 * 内部处理函数，模拟数据库查询操作，同时处理缓存，避免多次触发执行
 */
const _getFileContent = async ({ filename, category = '', range = [] }) => {
  const filePath = handleFilePath(filename)
  let res = []
  let monthlyIncome = 0
  let data = await fse.readFile(filePath, fileType)
  let dataArr = data.split(/\r?\n/).map((item) => item.split(','))
  let attrs = dataArr.shift()
  if (attrs.length === 4) {
    const [monthFirstDay, monthLastDay] = range
    res = dataArr
      .map(([type, time, category, amount]) => ({
        type: Number(type),
        time: Number(time),
        amount: Number(amount).toFixed(2),
        category,
      }))
      .filter((item) => (category ? item.category === category : item))
      .reverse()
    if (monthFirstDay && monthLastDay) {
      res = res.filter(
        (item) => item.time >= monthFirstDay && item.time <= monthLastDay
      )
      res.forEach((item) => {
        monthlyIncome += item.amount * (item.type ? 1 : -1)
      })
    }
  } else {
    res = dataArr.map(([id, type, name]) => ({
      id,
      name,
      type: Number(type),
    }))
  }
  return { res, monthlyIncome }
}

const _addTofile = async (filename, data) => {
  const filePath = handleFilePath(filename)
  try {
    fse.appendFileSync(filePath, data)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

module.exports = {
  _getFileContent,
  _addTofile,
}
