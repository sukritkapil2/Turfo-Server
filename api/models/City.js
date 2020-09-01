const mongoose = require('mongoose');

const locationSchema = {
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
}

const citySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: locationSchema,
        required: true
    },
    shops: [{
        type: String
    }]
});

module.exports = mongoose.model('City', citySchema);
