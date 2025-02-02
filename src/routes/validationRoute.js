const router = require('express').Router()
const controller = require('../controllers/validationController.js')

router.post('/', controller.validateCard)

module.exports = router