const mongoose = require('mongoose')

const MaterialModel = mongoose.Schema({
    title: {
        type: String,
        // require: true
    },
    image: {
        type: String,
        // require: true
    },
    price: {
        type: String
    },
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
    reference_du_processeur_: {
        type: String,
        // require: true
    },
    memoire_vive__ram__: {
        type: String,
        // require: true
    },
    information_sur_la_memoire_vive_: {
        type: String,
        // require: true
    },
    format_de_la_memoire_vive_: {
        type: String,
        // require: true
    },
    frequence_de_la_memoire_vive__en_mhz__: {
        type: String,
        // require: true
    },
    eligible_a_intel_evo_platform_: {
        type: String,
        // require: true
    },
    carte_graphique_: {
        type: String,
        // require: true
    },
    type_et_capacite_totale_de_stockage_: {
        type: String,
        // require: true
    },
    type_de_stockage_: {
        type: String,
        // require: true
    },
    lecteur_de_carte_memoire_: {
        type: String,
        // require: true
    },
    lecteur___graveur_: {
        type: String,
        // require: true
    },
    anti_reflets_: {
        type: String,
        // require: true
    },
    nombre_de_coeurs_: {
        type: String,
        // require: true
    },
    interet_du_nombre_de_coeurs_: {
        type: String,
        // require: true
    },
    type_de_carte_graphique_: {
        type: String,
        // require: true
    },
})

module.exports = mongoose.model('Materials', MaterialModel)