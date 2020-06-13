const Mutations = {
  setBillData(state, { total, list, monthlyIncome }) {
    state.bill.list = list
    state.bill.total = total
    state.bill.monthlyIncome = monthlyIncome
  },
  setPageNum(state, num) {
    state.queryConfig.pageNum = num
  },
  setPageSize(state, num) {
    state.queryConfig.pageSize = num
  },
  setQueryCategory(state, value) {
    state.queryConfig.category = value
  },
  setCategories(state, list) {
    const map = new Map()
    list.forEach((item) => {
      map.set(item.id, item.name)
    })
    state.categories.list = list
    state.categories.map = map
  },
  setLoadingStatus(state, value) {
    state.loading = value
  },
  setMonthRange(state, [firstDay, lastDay]) {
    state.queryConfig.monthRange = [firstDay, lastDay]
  },
}
export default Mutations
