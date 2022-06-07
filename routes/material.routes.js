const express = require('express')
const router = express.Router();
const materialController = require('../controllers/material.controllers')
const reqSession = require('../middlewares/auth.session')
const checkSession = require('../middlewares/check.session')

router.get('/all', materialController.getAllMaterials)
router.get('/:id', materialController.getMaterialById)
router.get('/searchByName/:keyWord', materialController.searchByName)

module.exports = router;