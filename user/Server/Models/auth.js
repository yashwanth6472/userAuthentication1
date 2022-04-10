const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    phoneNumber : {
        type: Number,
       
    },
})

const user = mongoose.model('users', userSchema);
module.exports = user;