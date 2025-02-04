const mongoose = require('mongoose');

const userSchma = mongoose.Schema({
    url : {
        type : String,
        required : true,
    },
    short_url : {
        type : String,
        unique : true,
    }
})
const shortUrlModel = mongoose.model('short_Url' , userSchma);

module.exports =shortUrlModel;