const express = require('express')
const {requireSignIn } = require('../controllers/auth')
const { createCart } = require('../controllers/cart')
const { userMiddleware } = require('../validation/signup-validation-middleware')

const router = express.Router()


router.post('/createCart',requireSignIn,userMiddleware,createCart)



module.exports = router