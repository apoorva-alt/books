//Code to create connection from mongodb
let mongoose = require('mongoose');
require('dotenv').config()

function connectionToDB() {
    return new Promise((resolve, reject) => {
        let url = `mongodb+srv://apoorva2:jaisaibaba123@cluster0.g12sr.mongodb.net/MoviesAssignment?retryWrites=true&w=majority`
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }, (err) => {
            if (!err) {
                resolve(`connection done`)
            } else {
                reject(`connection not done`)
            }
        })
    })
}
module.exports = connectionToDB;