require('dotenv').config()
const uuid = require('uuid')
const PSP = require('../models/psp.js')

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

    async processPixPayment(p)
    {
        const payment = p

        try {
            if(payment.method == 'PIX')
            {
                var psp = payment
                psp.id = uuid.v4()
                psp.payment = {
                    status:'PENDING',
                    link:`http://localhost:9090/api/payment/${psp.id}/pay`
                }

                const newPayment = new PSP(psp)
                await newPayment.save()

                return {
                    status:201,
                    content:psp
                }
            }   
        } catch (error) {
            throw error
        }
    }

    async processBilletPayment(p)
    {
        const payment = p

        try {
            if(payment.method == 'BILLET')
            {
                var psp = payment
                psp.id = uuid.v4()
                psp.payment = {
                    status:'PENDING',
                    link:`http://localhost:9090/api/payment/${psp.id}/pay`
                }
                const newPayment = new PSP(psp)
                await newPayment.save()

                return {
                    status:201,
                    content:psp
                }
            }   
        } catch (error) {
            throw error
        }
    }

    async pay(p)
    {
        var psp = await PSP.findOne({id: p})
        
        psp.payment.status = 'AUTHORISED'

        const newPSP = await PSP.findOneAndUpdate({id: p}, psp, {new: true})
        
        var callback = await fetch(newPSP.merchant.callbackURL,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newPSP)
        })
        callback = await callback.json()

        return {
            status:200,
            content:callback
        }
    }
}

module.exports = new PaymentServices()