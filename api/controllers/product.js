const mongoose = require("mongoose");

const Category = require('../models/Category');
const Product = require('../models/Product');

exports.get_categories = (req, res, next) => {
    Category.find({})
        .exec()
        .then((categories) => {
            res.status(200).json(categories);
        })
        .catch((err) => {
            res.status(500).json({
                err: err
            })
        })
}

exports.get_product_category = (req, res, next) => {

    const city = req.query.city;
    const category = req.params.category;

    if (city == null || city == undefined || category === null || category === undefined) {
        return res.status(400).json({
            message: "Please Send City and Category"
        })
    }

    Product.find({ city: city, category: category })
        .exec()
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((err) => {
            res.status(500).json({
                err: err
            })
        })
}