const User = require('../../models/user')
const jwt = require('jsonwebtoken')

exports.signUp = (req, res) => {

    User.findOne({ email: req.body.email }, (error, user) => {

        if (user) {
            res.status(400).json({message:'Admin already exits'})
        }
        else {
            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;

            const newUser = new User({

                firstName,
                lastName,
                email,
                password,
                userName: Math.random().toString(),
                role:"admin"

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
            const token = jwt.sign({ userId: user._id ,role:user.role}, process.env.JWT_SECRET_KEY);

            res.status(200).json({
                token: token,
                message: user
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
        const user = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=user;
        next()
}