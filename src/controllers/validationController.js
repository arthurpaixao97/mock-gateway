const ValidationServices = require('../services/validationServices.js')

class ValidationController {
    validateCard(req, res)
    {
        try {
            const v = ValidationServices.validateCard(req.body.card_data)
            res.status(v.status).send(v.content)
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
}

module.exports = new ValidationController()