require('dotenv').config()

const CN_AUTHORISED = process.env.CARD_NUMBER_AUTHORISED
const CN_DECLINED = process.env.CARD_NUMBER_DECLINED

class PaymentServices {
    processCreditCardPayment(p)
    {
        
        const payment = p
        var ret = {}
        
        if(payment.method == 'CREDIT_CARD')
        {
            if(payment.credit_card.number === parseInt(CN_AUTHORISED))
            {
                ret = {
                    status:200,
                    content:{
                        orderStatus: "AUTHORISED"
                    }
                }
            }
            if(payment.credit_card.number === parseInt(CN_DECLINED))
            {
                ret = {
                    status:400,
                    content:{
                        orderStatus: "DECLINED",
                        reason: 'Transaction refused'
                    }
                }
            }
        }

        return ret
    }

    //TODO: Receive a callback URL for asynchronous payments

    processPixPayment(p)
    {
        const payment = p

        try {
            if(payment.method == 'PIX')
            {
                return {
                    status:201,
                    content:{
                        orderStatus: "PENDING"
                    }
                }
            }   
        } catch (error) {
            throw error
        }
    }

    processBilletPayment(p)
    {
        const payment = p

        try {
            if(payment.method == 'BILLET')
            {
                return {
                    status:201,
                    content:{
                        orderStatus: "PENDING"
                    }
                }
            }   
        } catch (error) {
            throw error
        }
    }
}

module.exports = new PaymentServices()