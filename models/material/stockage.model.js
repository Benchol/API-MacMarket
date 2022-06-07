const mongoose = require('mongoose')

const StockageModel = mongoose.Schema({
    type_et_capacite_totale_de_stockage_: {
        type: String,
        require: true
    },
    type_de_stockage_: {
        type: String,
        require: true
    },
    lecteur_de_carte_memoire_: {
        type: String,
        require: true
    },
    lecteur___graveur_: {
        type: String,
        require: true
    },
})


module.exports = mongoose.model('Stockage', StockageModel)