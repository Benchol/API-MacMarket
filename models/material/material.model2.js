const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const MaterialModel = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    ecran: {
        type: ObjectId,
        ref: 'Ecran'
    },
    performance: {
        type: ObjectId,
        ref: 'Performance'
    },
    carte_graphique_: {
        type: String,
        require: true
    },
    stockage: {
        type: ObjectId,
        ref: 'Stockage'
    },
    anti_reflets_: {
        type: String,
        require: true
    },
    nombre_de_coeurs_: {
        type: String,
        require: true
    },
    interet_du_nombre_de_coeurs_: {
        type: String,
        require: true
    },
    type_de_carte_graphique_: {
        type: String,
        require: true
    },
})