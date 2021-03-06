const express = require('express')
const multer = require('multer')
const { requireSignIn } = require('../controllers/auth')
const shortid = require('shortid')
const { addProduct } = require('../controllers/product')
const path = require('path')
const { adminMiddleware } = require('../validation/signup-validation-middleware')


const router = express.Router()


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }

})


var upload = multer({ storage })

router.post('/addProduct', requireSignIn, adminMiddleware, upload.array('productImages'), addProduct)



module.exports = router