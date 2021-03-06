const {check , validationResult } = require('express-validator');
const user = require('../models/user');

exports.signupValidation = [
    check('firstName').isLength({min:2}).notEmpty().withMessage('firstName is not formated correctly'),
    check('lastName').isLength({min:2}).notEmpty().withMessage('lastName is not formated correctly'),
    check('email').isEmail().isLength({min:10}).notEmpty().withMessage('email is not formated correctly'),
    check('password').isLength({min:2}).notEmpty().withMessage('password is not formated correctly')
]

exports.signupValidationResult = (req,res,next) =>{
            
    const error = validationResult(req);

    if(error.array().length>0){
            return  res.status(400).json({
                  error:error.array()
              })
    }
    
        next()
    
    

}

exports.adminMiddleware = (req,res,next) =>{
            
    if(req.user.role!=='admin'){
        res.status(400).json({
            message:'you are not an admin'
        })
    }
    console.log("dsajdksajdkajdkl")
    next()

}

exports.userMiddleware = (req,res,next) =>{
            
    if(req.user.role!=='user'){
        res.status(400).json({
            message:'you are not an admin'
        })
    }
    console.log("dsajdksajdkajdkl")
    next()

}


