const { _getFileContent, _addTofile } = require('../common')

const cache = {
  bill: {
    list: [],
    total: 0,
    monthlyIncome: 0
  },
}

const handlePageConfig = (pageNum, pageSzie) => {
  let start = (pageNum - 1) * pageSzie
  let end = start + pageSzie
  return {
    start,
    end,
  }
}

const getContent = async ({ filename, category, range }) => {
  const { res, monthlyIncome } = await _getFileContent({
    filename,
    category,
    range,
  })
  cache[filename].list = res
  cache[filename].total = res.length
  cache[filename].monthlyIncome = monthlyIncome
}

const getBill = async (ctx) => {
  const { pageNum: n, pageSize: s, category, range, dirty } = ctx.request.body
  const { bill } = cache
  const { start, end } = handlePageConfig(Number(n), Number(s))
  if (dirty) await getContent({ filename: 'bill', category, range })
  const res = bill.list.slice(start, end)
  ctx.status = 200
  ctx.body = {
    success: true,
    result: {
      list: res,
      total: bill.total,
      monthlyIncome: bill.monthlyIncome
    },
  }
}

const addBill = async (ctx) => {
  const { type, amount, category, date } = ctx.request.body
  const data = `\n${type},${date},${category},${amount}`
  const res = await _addTofile('bill', data)
  ctx.start = 200
  ctx.body = {
    success: res,
    msg: res ? '添加成功' : '添加失败',
  }
}

module.exports = {
  getBill,
  addBill,
}
