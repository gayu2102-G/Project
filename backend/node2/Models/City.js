

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citySchema = new Schema
({
    
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    location_id: {
        type: Number,
        required: true
    },
    city_id: {
        type: Number,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    contact_number: {
        type: Number,
        required: true
    },
    avg_rating: {
        type: Number,
        required: false
    },
    cusinie: {
        type: String,
        required: true
    }

});

 
module.exports = mongoose.model('city',citySchema,'city');