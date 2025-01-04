require('dotenv').config()
const express = require('express')
const cookieParser= require('cookie-parser')
const app = express()

const PORT = process.env.PORT || 5000
const CN_AUTHORISED = process.env.CARD_NUMBER_AUTHORISED
const CN_DECLINED = process.env.CARD_NUMBER_DECLINED

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.post('/', async (req, res) => {
    setTimeout(() => {
        const payment = req.body.payment
        try {
            if(payment.method == 'CREDIT_CARD')
            {
                if(payment.credit_card.number === parseInt(CN_AUTHORISED))
                {
                    res.status(200).send({
                        orderStatus: "AUTHORISED"
                    })
                }
                if(payment.credit_card.number === parseInt(CN_DECLINED))
                {
                    res.status(400).send({
                        orderStatus: "DECLINED"
                    })
                }
            }
            if(payment.method == 'BILLET' || payment.method == 'PIX')
            {
                res.status(200).send({
                    orderStatus: "PENDING"
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message:'Unexpected Error'
            })
        }
    }, 2000)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})