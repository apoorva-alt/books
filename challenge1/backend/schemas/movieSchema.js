//Table in mongoDB having Director Details

const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    Did: {
        type: Number,
    },
    Director_name: {
        type: String,
    },
    age: {
        type: Number
    },
    Gender: {
        type: String
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String
    }
});

const model = mongoose.model('movies', movieSchema);
module.exports = model;