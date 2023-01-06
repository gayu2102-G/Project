const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        require: true
    },
    firstname:{
        type:String,
        require: true
    },
  
    Phoneno:{
        type:String,
        require: true
    },
    Password:{
        type:String,
        require: true
    }
});

module.exports = mongoose.model('User',userSchema,'User');