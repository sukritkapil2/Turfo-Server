const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true,
        default: "item"
    },
    rating: {
        type: Number,
        default: 5
    },
    thumbnail: {
        type: String,
        required: true
    },
    details: {
        type: String,
        requried: true
    },
    images: [{
        type: String
    }],
    lastUpdated: {
        type: Date,
        default: new Date()
    },
    shopId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        default: "general"
    },
    deliveryPrice: {
        type: Number,
        required: true
    },
    complaints: [{
        name: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }],
    city: {
        type: String,
        required: true
    },
    purchases: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Product', productSchema);
