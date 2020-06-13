import url from '../api/url'
import axios from 'axios'

const Actions = {
  async getBill({ state, commit }, { dirty }) {
    let { queryConfig } = state
    let body = {
      dirty,
      pageNum: queryConfig.pageNum,
      pageSize: queryConfig.pageSize,
      category: queryConfig.category,
      range: [queryConfig.monthRange[0], queryConfig.monthRange[1]],
    }
    commit('setLoadingStatus', true)
    await axios.post(url.bill.getBill, body).then(({ data }) => {
      const { success, result } = data
      if (success) {
        commit('setBillData', {
          list: result.list,
          total: result.total,
          monthlyIncome: result.monthlyIncome,
        })
        commit('setLoadingStatus', false)
      }
    })
  },
  // eslint-disable-next-line no-unused-vars
  async addBill({ state }, data) {
    return await axios.post(url.bill.addBill, {
      ...data,
      date: +new Date(data.date),
    })
  },

  async getCategories({ commit }) {
    await axios.get(url.categories.getCategories).then(({ data }) => {
      const { success, categories: list } = data
      if (success) {
        commit('setCategories', list)
      }
    })
  },
}
export default Actions
