const express = require('express')
const { requireSignIn } = require('../controllers/admin/auth')
const { createCategory, getAllCategory } = require('../controllers/category')
const { adminMiddleware } = require('../validation/signup-validation-middleware')
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')

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

router.post('/createCategory',requireSignIn,adminMiddleware,upload.array('categoryImages'),createCategory)
router.post('/getAllCategory',getAllCategory)


module.exports = router