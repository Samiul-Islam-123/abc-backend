const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    profilePicture : {
        type : String,
        required : true
    },
    clerkID : {
        type : String,
        required : true
    },
    updatedAt : {
        type : Date,
        default : Date.now()
    }
})

const UserModel = new mongoose.model('users', UserSchema)

module.exports = UserModel;