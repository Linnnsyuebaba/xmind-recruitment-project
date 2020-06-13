const State = {
  categories: {
    list: [],
    map: new Map()
  },
  bill: {
    list: [],
    total: 0,
  },
  queryConfig: {
    pageNum: 1,
    pageSize: 10,
    category: '',
    monthRange: [0, 0],
  },
  loading: false,
}
export default State
