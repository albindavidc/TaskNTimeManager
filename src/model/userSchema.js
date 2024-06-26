const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },

    
    antLab:{
        type : String,
        required:true,
    },


    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: String,
        default: false,
    },


 

    
},
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('User', userSchema);