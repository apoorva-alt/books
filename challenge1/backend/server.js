const express = require('express');
const app = express();
app.use(express.json());

//Policy used  to communicate between frontend and backend
var cors = require('cors');
app.use(cors());

//dbconnect (database connection Mongodb)
const dbconnect = require('./schemas/dbconnect');

//routes used for path or URL
const movieRouter = require('./routes/routes');
app.use('', movieRouter);

//Port on which backend is running
const PORT = process.env.PORT | 4000;
app.listen(PORT, async() => {
    console.log("Server running at port ----" + PORT);
    await dbconnect()
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error.message);
        })
});