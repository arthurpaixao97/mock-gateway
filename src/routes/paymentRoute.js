const router = require('express').Router()
const controller = require('../controllers/paymentController.js')

router.post('/creditCard', controller.creditCard)
router.post('/pix', controller.pix)
router.post('/billet', controller.billet)
router.post('/:id/pay', controller.pay)

module.exports = router