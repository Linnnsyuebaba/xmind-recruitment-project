const { _getFileContent } = require('../common')

const getCategories = async (ctx) => {
  const res = await _getFileContent({ filename: 'categories' })
  ctx.status = 200
  ctx.body = {
    success: true,
    categories: res
  }
}
module.exports = {
  getCategories,
}
