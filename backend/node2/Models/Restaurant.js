const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema
({
    _id:{
        type: String,
        required: true
    },
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
            type:Number,
            required: true
        },

        locality: {
            type: String,
            required: true
        },
        
        thumb:{
            type:String,
            required:true
        },
        
        Cuisine:{
            type:Array,
            required:true
        },

       cost:{
            type:Number,
            required:true
        }, 
        
       type :{
           type:Array,
           require:true
       },

       cuisine_id :{
        type:Number,
        require:true
       } 


});

module.exports = mongoose.model('Restaurant',RestaurantSchema,'Restaurant');