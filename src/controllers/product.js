const Product = require('../models/product')
const slugify = require('slugify')


exports.addProduct = (req, res) => {

    console.log(req.body.productName+" "+req.body.category)

    const  {
        productName,
        category,
        price,
        description,
        } = req.body

    const product =  {
        productName,
        category,
        price,
        description,
        createdBy:{"user":req.user.userId}
    }

    
    const productImages=[]

    if(req.files.length>0){
        req.files.forEach(element => {
            productImages.push({
                img:process.env.API+"public/"+element.filename
            })
        });
    }

    product.productImages=productImages

    console.log(product)
    
    const newProduct = new Product(product)

    newProduct.save((error,product)=>{
        console.log(error)
             if(error){
                 res.status(400).json({
                     message:error
                 })
             }
             else{
                 res.status(200).json({
                     newProduct:product
                 })
                 console.log(product)
             }
    })

}

