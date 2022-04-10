const mongoose = require('mongoose')

const allUsersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    }
    
})

const allUsers = mongoose.model('allusers', allUsersSchema)

module.exports = allUsers