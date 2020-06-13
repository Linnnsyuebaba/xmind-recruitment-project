import BASE_URL from '../base/config'
const BASE = BASE_URL.api
const path = {
  getCategories: `${BASE}/getCategories`,
}
export default {
  ...path
}