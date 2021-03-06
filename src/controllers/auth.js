const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.signUp = (req, res) => {

    User.findOne({ email: req.body.email }, (error, user) => {

        if (user) {
            console.log('user found')
        }
        else {
            const {
                firstName,
                lastName,
                email,
                password,
                role
            } = req.body;

            const newUser = new User({

                firstName,
                lastName,
                email,
                password,
                role,
                userName: Math.random().toString()

            })

            newUser.save((error, data) => {
                if (error) {
                    res.status(200).json({
                        message: "something went worng"
                    })
                }
                else {
                    res.status(200).json({
                        message: data
                    })
                }
            })
        }
    })


    console.log("user signUp")
}

exports.signIn = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {

        if (error) {
            res.status(400).json({
                message: "error"
            })
        }
        if (user.authenticate(req.body.password)) {

            const token = jwt.sign({ userId: user._id ,role:user.role}, process.env.JWT_SECRET_KEY,{expiresIn:'1h'});

            res.status(200).json({
                token: token,
                message: user.fullName
            })
        }
        else {
            res.status(400).json({
                message: "password doesn't match beta ji"
            })
        }
    })
}

exports.requireSignIn = (req,res,next)=>{
        const token = req.headers.authentication.split(" ")[1];
        const user= jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(user);
        req.user=user;
        next()
}