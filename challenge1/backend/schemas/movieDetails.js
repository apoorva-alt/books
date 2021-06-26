// Table present in MongoDB  (Movie names)
const mongoose = require('mongoose');
const movieDetails = new mongoose.Schema({
    Mid: {
        type: Number,
    },
    MovieName: {
        type: String,
    },
    DirID: {
        type: String
    }
});

const model2 = mongoose.model('movieDetails', movieDetails);
module.exports = model2;