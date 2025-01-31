const mongoose = require('mongoose');

const ownerSchema = {
    name: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}

const shopSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    owner: {
        type: ownerSchema,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    gallery: [{
        type: String
    }],
    shopPhone: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    defaultDeliveryPrice: {
        type: Number,
        required: true
    },
    dateAdded: {
        type: Date,
        default: new Date()
    },
    verified: {
        type: Boolean,
        default: false,
    },
    city: {
        type: String,
        required: true
    },
    products: [{
        type: String
    }],
    reviews: [{
        name: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }]
})

module.exports = mongoose.model('Shop', shopSchema)