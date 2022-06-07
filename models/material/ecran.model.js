const mongoose = require('mongoose')

const EcranModel = mongoose.Schema({
    taille_de_l_ecran__en_pouces__diagonale__: {
        type: String,
        require: true
    },
    type_de_resolution_: {
        type: String,
        require: true
    },
    resolution_: {
        type: String,
        require: true
    },
    type_de_charniere_: {
        type: String,
        require: true
    },
    type_d_ecran_: {
        type: String,
        require: true
    },
    webcam_integree_: {
        type: String,
        require: true
    },
    microphone_integre_: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model('Ecran', EcranModel);