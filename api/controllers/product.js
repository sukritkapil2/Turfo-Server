const mongoose = require("mongoose");

const Category = require('../models/Category');
const Product = require('../models/Product');
const Shop = require('../models/Shop')

exports.get_specific_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(product => {
            if (product) {
                res.status(200).json(product)
            } else {
                res.status(404)
                    .json({
                        message: "No document found with this id"
                    })
            }
        })
        .catch((err) => {
            res.status(500).json({
                err: err
            })
        })
}

exports.get_products_shop = (req, res, next) => {

    const id = req.params.shopId;

    if (id == null || id == undefined) {
        return res.status(400).json({
            message: "Please Send Shop ID"
        })
    }

    Shop.findById(id)
        .exec()
        .then((result) => {
            var productsArray = result.products;

            Product.find({
                _id: {
                    $in: productsArray
                }
            })
                .exec()
                .then((resultProducts) => {
                    res.status(200).json(resultProducts)
                })
                .catch((err) => {
                    res.status(500).json({
                        err: err
                    })
                })
        })
}

exports.get_trending = (req, res, next) => {
    const city = req.query.city;

    if (city == null || city == undefined) {
        return res.status(400).json({
            message: "Please Send City and Category"
        })
    }

    Product.find({ city: city })
        .sort({ purchases: -1 })
        .limit(8)
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