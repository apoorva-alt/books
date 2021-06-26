//Here all the url paths ae given

let express = require('express');
let controller = require('../controllers/controller')
let router = express.Router()

//route to get all directors
router.get('/movies', controller.getMethod);

//route to get director details
router.get('/director/:id', controller.getDMethod);

//Route to create a Director (Add Director)
router.post('/create', controller.createmovies);

//Route to create new user (Register)
router.post('/createUser', controller.createUser);

//Route for login
router.post('/login', controller.login);

//Route to add movie in specific director
router.post('/movieDetails', controller.detailsmovie);

//Route to fetch movies of specific director
router.post('/moviesDetails', controller.detailsmovies);
module.exports = router;