let movieSchema = require('../schemas/movieSchema')
let userSchema = require('../schemas/userSchema')
let movieDetails = require('../schemas/movieDetails')

//show all directors 
exports.getMethod = (req, res) => {
        movieSchema.find()
            .then(result => {
                res.json(result);
            })
            .catch(err => console.log(err));
    }
    // Create director
exports.createmovies = (req, res) => {
    console.log(req.body);
    var data = new movieSchema({
        Did: req.body.Did,
        Director_name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.Url,
        age: parseInt(req.body.age),
        Gender: req.body.gender,
    });
    data.save();
    res.send("done");
}

//create user
exports.createUser = (req, res) => {
    console.log(req.body);
    var data = new userSchema({ uid: req.body.uid, user_name: req.body.email, password: req.body.password });
    data.save();
    res.send("User Created");
}

//get Director details
exports.getDMethod = (req, res) => {
    console.log(req.params);
    movieSchema.findById(req.params.id)
        .then(result => {
            res.json(result);
        })
        .catch(err => console.log(err));
}

//Login method
exports.login = (req, res) => {
    console.log(req.body);
    let { email, password } = req.body
    userSchema.find({ user_name: email })
        .then(result => {
            console.log(result);
            if (result.length >= 1 && result[0].user_name == req.body.email && result[0].password == req.body.password) {
                res.send({ message: "success" });
            } else
                res.send("user not found")
        })
        .catch(err => {
            res.send(err, "data not found")
        });
}

//store movies of derictor
exports.detailsmovie = (req, res) => {
    console.log(req.body);
    var data = new movieDetails({ MovieName: req.body.name, DirID: req.body.DirId });
    data.save();
    res.send("Movie Added");
}

//fetch movies of derictor
exports.detailsmovies = (req, res) => {
    console.log(req.body);
    movieDetails.find({ DirID: req.body.id })
        .then(result => {
            res.send(result);
        })
        .catch(err => console.log(err));
}