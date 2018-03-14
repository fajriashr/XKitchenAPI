const express = require ('express');
const app = express();

const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');

//routers
const userRouter = require('./api/routers/users');

//connecting to mongodb

mongoose.connect("mongodb://localhost:27017/XKitchen");


mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/users', userRouter);

app.use ((req, res, next)=>{
    console.log("server is running...");
    res.status(200).json({
        message : "hi, i'm learning nodejs"
    });
});

module.exports = app;