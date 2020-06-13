const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')

const billController = require('./controller/bill')
const categoryController = require('./controller/category')
const app = new Koa()
const router = new Router()
app.use(koaBody())

const PORT = 2222

const getBill = new Router()
getBill.post('/getBill', billController.getBill)

const addBill = new Router()
addBill.post('/addBill', billController.addBill)

const getCategories = new Router()
getCategories.get('/getCategories', categoryController.getCategories)

router.use('/xmind', getBill.routes(), getBill.allowedMethods())
router.use('/xmind', addBill.routes(), addBill.allowedMethods())
router.use('/xmind', getCategories.routes(), getCategories.allowedMethods())

app.use(router.routes(), router.allowedMethods())

app.listen(PORT, () => {
  console.log(`server run http://127.0.0.1:${PORT}`)
})
