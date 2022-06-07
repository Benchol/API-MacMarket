const mongoose = require('mongoose')

const PerformanceModel = mongoose.Schema({
    reference_du_processeur_: {
        type: String,
        require: true
    },
    memoire_vive__ram__: {
        type: String,
        require: true
    },
    information_sur_la_memoire_vive_: {
        type: String,
        require: true
    },
    format_de_la_memoire_vive_: {
        type: String,
        require: true
    },
    frequence_de_la_memoire_vive__en_mhz__: {
        type: String,
        require: true
    },
    eligible_a_intel_evo_platform_: {
        type: String,
        require: true
    },
})


module.exports = mongoose.model('Performance', PerformanceModel)