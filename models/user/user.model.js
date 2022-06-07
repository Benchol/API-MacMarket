const mongoose = require('mongoose')

const User = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    wallet: {
        type: Number,
    },
    cart: [{
        type: mongoose.Types.ObjectId,
        ref: 'Materials'
    }]
})


module.exports = mongoose.model('User', User);