const mongoose = require('mongoose')

const pspSchema = new mongoose.Schema({
    id:String,
    merchant:{
        reference:String,
        callbackURL:String
    },
    shopper:{
        name:String,
        email:String,
        document:String
    },
    payment:{
        status:String,
        link:String
    }
})

module.exports = mongoose.model('PSP', pspSchema)