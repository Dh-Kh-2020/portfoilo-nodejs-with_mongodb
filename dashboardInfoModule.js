const mongoose = require('mongoose');

const personal_info_Schema = new mongoose.Schema(
    {
        fullName: {
            type: String, 
            required: true,
            unique: true
        },

        userName: {
            type: String,
            required: true,
            unique: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        profile_picture: {
            type: String,
            required: true,
            unique: true
        },

        cv: {
            type: String,
            required: true,
            unique: true
        }
        // address: [
        //     {
        //         country: {type: String, require: true},
        //         city: {type: String, require: true}
        //     }
        // ] 
    }
)

const personal_info = mongoose.model('personal_info', personal_info_Schema);
module.exports = personal_info;