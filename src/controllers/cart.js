const Cart = require('../models/cart')
const product = require('../models/product')



exports.createCart = (req, res) => {

    Cart.findOne({ user: req.user.userId }).exec((error, cart) => {
        if (error) {
            return res.status(400).json({
                error: error
            })
        }
        if (cart) {

            const item = cart.cartItems.find((product) => 
                product.product ==req.body.cartItems.product
            )

            if (item) {

                Cart.findOneAndUpdate({ "user": req.user.userId , "cartItems.product":item.product }, {
                    '$set': {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            "quantity":item.quantity+req.body.cartItems.quantity
                        }
                    }
                }, (error, cart) => {
                    if (error) {
                        return res.status(400).json({
                            error: error
                        })
                    }
                    else {
                        return res.status(200).json({
                            message: cart
                        })
                    }
                })

            }
            else {

                Cart.findOneAndUpdate({ "user": req.user.userId }, {
                    '$push': {
                        "cartItems": {
                            ...req.body.cartItems
                        }
                    }
                }, (error, cart) => {
                    if (error) {
                        return res.status(400).json({
                            error: error
                        })
                    }
                    else {
                        return res.status(200).json({
                            message: cart
                        })
                    }
                })
            }

        }
        else {
            const cart = {
                user: req.user.userId,
                cartItems: [
                    {
                        ...req.body.cartItems
                    }
                ]
            }



            const newCart = new Cart(cart);

            newCart.save((error, cart) => {
                if (error) {
                    return res.status(400).json({
                        message: 'cart not created'
                    })
                }
                if (cart) {
                    return res.status(400).json({
                        message: cart
                    })
                }
            })

        }
    })


    console.log("cart created")
}

