const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        min: 2,
        max: 30
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        min: 2,
        max: 30
    },
    userName: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hashPassword: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        require: true
    },
    contactNo: {
        type: String,
        trim: true
    },
    profilePicture: {
        type: String,
        trim: true
    }


}, { timestamps: true })


userSchema.virtual('password').set(function (password) {
    this.hashPassword = bcrypt.hashSync(password, 10);
})


userSchema.virtual('fullName').get(function () {
    return this.firstName + this.lastName;
})

userSchema.methods = {
    authenticate: function (password) {
        return bcrypt.compare(password, this.hashPassword)
    }
}


module.exports = mongoose.model('user', userSchema)