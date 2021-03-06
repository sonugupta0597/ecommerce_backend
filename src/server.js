const express = require('express')
const app = express();
const env = require('dotenv')
const mongoose = require('mongoose')
const userRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const product = require('./models/product');
const path = require('path')
const cors = require('cors')

env.config()




app.use(cors())
app.use('/public',express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/category', categoryRoutes)
app.use('/product', productRoutes)
app.use('/cart', cartRoutes)

mongoose.set('useCreateIndex', true);

mongoose.connect(`mongodb+srv://${process.env.MONGO_dB_USER}:${process.env.MONGO_dB_PASSWORD}@cluster0.dzbvo.mongodb.net/${process.env.MONGO_dB_DATABSE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    console.log("connected successfully")
})

app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`)
})

app.get('/', (req, res) => {
    res.status(200).send({
        name: 'sonu gupta'
    })
})

app.get('/check', (req, res) => {
    product.findOneAndUpdate({ '_id': '60225c5c706c123da04fb9d6', 'productImages._id': '60225c5c706c123da04fb9d7' }, { $set: { 'productImages.$.img': "123721337218" } }, (error, result) => {
        console.log(result)
    })
})

app.post('/data', (req, res) => {
    console.log(req.body.name)
    res.status(200).json({
        message: req.body
    })
})

console.log("server started")