const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.get_user = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then((user) => {
            if (user) {
                const returnUser = {
                    seller: user.seller,
                    name: user.name,
                    email: user.email
                };
                res.status(200).json(returnUser)
            } else {
                res.status(404).json({
                    message: "No user found with this id"
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                err: err
            })
        })
}

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
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            seller: false
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

exports.login_user = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth Failed"
                })
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth Failed"
                        })
                    }

                    if (result) {
                        const token = jwt.sign(
                            {
                                name: user[0].name,
                                email: user[0].email,
                                userId: user[0]._id,
                                seller: user[0].seller
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "30d"
                            }
                        );
                        return res.status(200).json({
                            id: user[0]._id,
                            message: "Auth Successful",
                            token: token
                        })
                    }
                    res.status(401).json({
                        message: "Auth Failed"
                    })
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}