const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        require: true,
        trim: true,
        unique:true
    },
    categoryImages:[{img:{type:String}}],
    slug: {
        type: String,
        require: true,
        trim: true
    },
    parentId: {
        type: String,
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model('category',categorySchema)