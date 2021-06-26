//requiring dependencies.
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(express.json())
app.use(cors());

const UserRouter = require('./Router/user.router');
const QuestionRouter = require('./Router/question.router');
app.use('/users', UserRouter);
app.use('/questions', QuestionRouter)

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))


const url = `mongodb+srv://apoorva2:jaisaibaba123@cluster0.g12sr.mongodb.net/challenge2?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection successfully");
})