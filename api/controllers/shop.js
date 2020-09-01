const mongoose = require("mongoose");

const Shop = require('../models/Shop');
const City = require('../models/City')

exports.get_shop_specific = (req, res, next) => {
    const id = req.params.shopId;
    Shop.findById(id)
        .exec()
        .then(shop => {
            if (shop) {
                res.status(200).json(shop)
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

exports.get_shops = (req, res, next) => {
    const city = req.query.city;
    const category = req.query.category;

    if (city === undefined || city === null) {
        return res.status(400).json({
            message: "Please Send City"
        })
    }

    City.findOne({ name: city })
        .exec()
        .then((result) => {
            var shopsArray = result.shops;

            Shop.find({
                '_id': {
                    $in: shopsArray
                },
                'verified': true
            })
                .exec()
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(500).json({
                        err: err
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                err: err
            })
        });
}

exports.add_shop = (req, res, next) => {
    const newShop = new Shop({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        address: req.body.address,
        owner: req.body.owner,
        category: req.body.category,
        thumbnail: req.body.thumbnail,
        gallery: req.body.gallery,
        shopPhone: req.body.shopPhone,
        rating: 3,
        city: req.body.city,
        defaultDeliveryPrice: req.body.defaultDeliveryPrice,
        dateAdded: new Date(),
        verified: false,
    });

    newShop.save()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: "Shop Added!"
            })
        })
        .catch((err) => {
            res.status(500).json({
                err: err
            })
        })
}