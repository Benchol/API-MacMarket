const mongoose = require('mongoose')


const sessionModel = mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    iat: Number,
    exp: Number
})

module.exports = mongoose.model('Session', sessionModel)