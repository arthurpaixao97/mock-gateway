const router = require('express').Router()
const paymentRoute = require('./routes/paymentRoute.js')
const validationRoute = require('./routes/validationRoute.js')

router.use('/payment', paymentRoute)
router.use('/validation', validationRoute)

module.exports = router