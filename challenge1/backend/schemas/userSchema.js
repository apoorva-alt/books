//All login details are stored in this table

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    Uid: {
        type: Number,
    },
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    }
})
const user = mongoose.model('userDetails', userSchema);
module.exports = user;