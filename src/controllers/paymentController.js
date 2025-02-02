const PaymentServices = require('../services/paymentServices.js')

class PaymentController {
    async creditCard(req, res)
    {
        try {
            const p = await PaymentServices.processCreditCardPayment(req.body.payment)
            res.status(p.status).send(p.content)
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    pix(req, res)
    {
        try {
            const p = PaymentServices.processPixPayment(req.body.payment)
            res.status(p.status).send(p.content)
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    billet(req, res)
    {
        try {
            const p = PaymentServices.processBilletPayment(req.body.payment)
            res.status(p.status).send(p.content)
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
}

module.exports = new PaymentController()