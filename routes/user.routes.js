const express = require('express')
const router = express.Router()
const reqSession = require('../middlewares/auth.session')
const userController = require('../controllers/user.controllers')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/logout', userController.logout)
router.put('/updateUser/', userController.updateUser)

router.post('/addToCart', userController.addProduct)
router.post('/deleteToCart', userController.deleteInCart)

module.exports = router;