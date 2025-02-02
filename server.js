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

const apiRouter = require('./src/api.js')

app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})