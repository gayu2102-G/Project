const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
        username: {
            type: String,
            required: true
        },
        mobilenumber: {
            type: Number,
            required: true
        },
       address: {
            type: String,
            requires: true
        },
        items:{
            type:String,
            required:true
        },
        total : {
            type: Number,
            required: true
        }
});

module.exports = mongoose.model('Order',OrderSchema,'Order');