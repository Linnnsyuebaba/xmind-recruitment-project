import BASE_URL from '../base/config'
const BASE = BASE_URL.api
const path = {
  getBill: `${BASE}/getBill`,
  addBill: `${BASE}/addBill`,
}

export default {
  ...path,
}
