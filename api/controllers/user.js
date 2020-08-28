const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.register_user = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail Exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const newUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        newUser
                            .save()
                            .then((result) => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User Created!"
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
}