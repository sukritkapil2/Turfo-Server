const mongoose = require("mongoose");
const Helpers = require('../helpers/helperFunctions')

const Shop = require('../models/Shop');

exports.get_shops = (req, res, next) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const distance = req.body.distance;

    if (latitude === undefined || longitude === undefined || latitude === null || longitude === null || distance === undefined || distance === null) {
        return res.status(400).json({
            message: "Please Send Location and Distance in Body"
        })
    }

    var shopsNearby = []

    Shop.find({})
        .exec()
        .then((shops) => {
            shops.map((shopDoc) => {
                if (Helpers.getDistance(shopDoc.location.latitude, shopDoc.location.longitude, latitude, longitude) <= distance) {
                    shopsNearby.push(shopDoc);
                }
            });
            res.status(200).json({
                shopsNearby
            })
        })
        .catch((err) => {
            res.status(500).json({
                err: err
            })
        })
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
        rating: req.body.rating,
        location: req.body.location,
        defaultDeliveryPrice: req.body.defaultDeliveryPrice,
        dateAdded: new Date(),
        verified: req.body.verified,
        reviews: req.body.reviews
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