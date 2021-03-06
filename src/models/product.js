const mongoose = require('mongoose')
const Schema = require('mongoose').Schema;


const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type:Schema.Types.ObjectId,
        ref:'category',
        required:true
    },
    productImages:[
        {
            img:{
                type:String,
            }
        }
    ],
    price:{
        type:Number,
        required:true,
        trim:true
    },
    offers:{
        type:Number
    },
    description:{
        type:String,
        max:400,
        required:true,
        trim:true
    },
    review:[{
        user:{type:Schema.Types.ObjectId,ref:'user'},
        rating:{ 
            type:Number
        }
    }],
    order:[{
        user:{type:Schema.Types.ObjectId,ref:'user'},
        status:{
            type:String
        }
    }],
    createdBy:{
        user:{type:Schema.Types.ObjectId,ref:'User',required:true } ,
         
     },
    updated:Date
}, { timestamps: true })

module.exports = mongoose.model('product',productSchema)