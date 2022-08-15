const Materials = require('../models/material/material.model')


exports.getAllMaterials = (req, res) => {
    // console.log('Get all materials');
    // console.log('Sessions in controller : => ', req.session.userId);
    // console.log('Token => ', req.header('Authorization'));
    Materials.find({}).then(materials => {
            let dataToSend = []

            dataToSend = materials.map(
                material => {
                    // console.log(typeof(material._id));

                    return {
                        "_id": material._id,
                        "title": material.title,
                        "image": material.image,
                        "taille_de_l_ecran__en_pouces__diagonale__": material.taille_de_l_ecran__en_pouces__diagonale__,
                        "reference_du_processeur_": material.reference_du_processeur_ == 'Non communiqué' ? '' : material.reference_du_processeur_,
                        "memoire_vive__ram__": material.memoire_vive__ram__ == 'Non communiqué' ? '' : material.memoire_vive__ram__,
                        "type_et_capacite_totale_de_stockage_": material.type_et_capacite_totale_de_stockage_ == 'Non communiqué' ? '' : material.type_et_capacite_totale_de_stockage_,
                        "price": material.price
                    }
                }
            )

            // console.log(materials);
            if (req.user) {
                res.status(200).json({
                    user: req.user,
                    data: dataToSend,
                    status: true,
                    message: 'Get all material successfully !!'
                })
            } else {
                res.status(200).json({
                    data: dataToSend,
                    status: true,
                    message: 'Get all material successfully !!'
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                status: false,
                message: 'Data not found ' + err
            })
        })
}

exports.getMaterialById = (req, res) => {
    // console.log('Params => ', req.params.id);
    Materials.findOne({ _id: req.params.id })
        .then(material => {
            // console.log('Material ==> ', material);
            res.status(200).json({
                status: true,
                data: material,
                message: 'Get one material successfully !!'
            })
        })
        .catch(err => {
            res.status(404).json({
                status: false,
                message: 'Data not found ' + err
            })
        })
}

exports.searchByName = (req, res) => {
    Materials.find({}).then(
            materials => {
                dataToSend = []
                dataToSend = materials.filter(material => {
                    let title = material.title.toLowerCase()
                        // console.log(req.params.keyWord.toLowerCase());
                        // console.log(title, req.params.keyWord);
                    if (title.includes(req.params.keyWord.toLowerCase())) {
                        return {
                            "_id": material._id,
                            "title": material.title,
                            "image": material.image,
                            "taille_de_l_ecran__en_pouces__diagonale__": material.taille_de_l_ecran__en_pouces__diagonale__,
                            "reference_du_processeur_": material.reference_du_processeur_ == 'Non communiqué' ? '' : material.reference_du_processeur_,
                            "memoire_vive__ram__": material.memoire_vive__ram__ == 'Non communiqué' ? '' : material.memoire_vive__ram__,
                            "type_et_capacite_totale_de_stockage_": material.type_et_capacite_totale_de_stockage_ == 'Non communiqué' ? '' : material.type_et_capacite_totale_de_stockage_,
                            "price": material.price
                        }
                    }
                })

                res.status(201).json({
                    status: true,
                    message: 'Search success',
                    data: dataToSend
                })
            })
        .catch(err => {
            res.status(400).json({
                status: false,
                status: 'Error find all ' + err
            })
        })
}