class ValidationServices {
    validateCard(c)
    {
        return {
            status: 200,
            content: {
                validationStatus: 'AUTHORISED'
            }
        }
    }
}

module.exports = new ValidationServices()