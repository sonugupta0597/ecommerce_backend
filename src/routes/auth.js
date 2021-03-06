const express = require('express')
const { signUp, signIn, requireSignIn } = require('../controllers/auth')
const { signinValidation, signinValidationResult } = require('../validation/signin-validation-middleware')
const { signupValidation, signupValidationResult } = require('../validation/signup-validation-middleware')

const router = express.Router()


router.post('/signIn',signinValidation,signinValidationResult,signIn)

router.post('/signUp',signupValidation,signupValidationResult, signUp)

router.post('/profile',requireSignIn,(req,res)=>{

    res.status(200).json({
             message:req.user.role
    })
    
})


module.exports = router