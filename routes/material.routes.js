const express = require('express')
const router = express.Router();
const materialController = require('../controllers/material.controllers')
const reqSession = require('../middlewares/auth.session')
const checkSession = require('../middlewares/check.session')

router.get('/all', reqSession, materialController.getAllMaterials)
router.get('/:id', reqSession, materialController.getMaterialById)
router.get('/searchByName/:keyWord', reqSession, materialController.searchByName)

module.exports = router;