require('dotenv').config()
const express = require('express')
const cookieParser= require('cookie-parser')
const mongoose = require('mongoose')
const app = express()

const PROTOCOL = process.env.PROTOCOL || 'http'
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 9090
const BASEURL = `${PROTOCOL}://${HOST}:${PORT}`
const DB_URI = process.env.DB_URI
const CN_AUTHORISED = process.env.CARD_NUMBER_AUTHORISED
const CN_DECLINED = process.env.CARD_NUMBER_DECLINED

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const apiRouter = require('./src/api.js')

app.use('/api', apiRouter)

app.listen(PORT, () => {
  mongoose.connect(DB_URI)
  console.log(`Server is running on port ${PORT}`)
})