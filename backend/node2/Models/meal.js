const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        city_id: {
            type: Number,
            required: true
        },
        location_id: {
            type: Number,
            requires: true
        },
        country_name: {
            type: String,
            required: true
        }
});

module.exports = mongoose.model('meal',mealSchema,'meal');