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

    async pix(req, res)
    {
        try {
            const p = await PaymentServices.processPixPayment(req.body.payment)

            res.status(p.status).send(p.content)
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    async billet(req, res)
    {
        try {
            const p = await PaymentServices.processBilletPayment(req.body.payment)
            res.status(p.status).send(p.content)
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    async pay(req, res)
    {
        try {
            const p = await PaymentServices.pay(req.params.id)
            res.status(p.status).json(p.content)
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
}

module.exports = new PaymentController()