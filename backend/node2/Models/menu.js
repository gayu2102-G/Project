const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const menuSchema = new Schema({
        item: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true
        },
     description: {
            type: String,
            requires: true
        },
     restaurantId: {
            type: String,
            required: true
        }
});

module.exports = mongoose.model('menu',menuSchema,'menu');