const Category = require('../models/category')
const slugify = require('slugify')


exports.createCategory = (req, res) => {

    Category.findOne({ categoryName: req.body.categoryName }).exec((error, category) => {
        if (error) {
            return res.status(400).json({
                error: error
            })
        }
        if (category) {
            return res.status(200).json({
                message: 'category is already exits'
            })
        }
        else {
            const category = {
                categoryName: req.body.categoryName,
                slug: slugify(req.body.categoryName)
            }


            const categoryImages = []

            if (req.files.length > 0) {
                req.files.forEach(element => {
                    categoryImages.push({
                        img: process.env.API+"public/"+element.filename
                    })
                });
            }

            category.categoryImages = categoryImages

            if (req.body.parentId !== null) {
                category.parentId = req.body.parentId
            }

            const newCategory = new Category(category);

            newCategory.save((error, category) => {
                if (error) {
                    return res.status(400).json({
                        message: 'category not created'
                    })
                }
                if (category) {
                    return res.status(400).json({
                        message: category
                    })
                }
            })

        }
    })


    console.log("category created")
}

exports.getCategoryJson = (categories, parentId = undefined) => {
    const categoryList = []


    if (parentId !== undefined) {
        categories.forEach(category => {
            if (category.parentId === parentId) {
                categoryList.push({
                    categoryName: category.categoryName,
                    subcategory: this.getCategoryJson(categories, category.categoryName)
                })
            }
        });
        console.log(categoryList)
    }

    return categoryList;
}

exports.getAllCategory = (req, res) => {

    Category.find({}).exec((error, categories) => {

        if (error) {
            res.status(400).json({
                message: "error has been occurs"
            })
        }
        else {

            const categoryList = []

            categories.forEach(category => {
                if (category.parentId === undefined) {
                    categoryList.push({
                        categoryName: category.categoryName,
                        subcategory: this.getCategoryJson(categories, category.categoryName)
                    })
                }
            });

            res.status(200).json({
                categories: categoryList
            })
        }

    })

    console.log("get All")
}

