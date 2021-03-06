const { check, validationResult } = require('express-validator');


exports.signinValidation = [
    check('email').isEmail().isLength({ min: 10 }).notEmpty().withMessage('email is not formated correctly'),
    check('password').isLength({ min: 2 }).notEmpty().withMessage('password is not formated correctly')
]

exports.signinValidationResult = (req, res, next) => {

    const error = validationResult(req);

    if (error.array().length > 0) {
        return res.status(400).json({
            error: error.array()
        })
    }

    next()




}



