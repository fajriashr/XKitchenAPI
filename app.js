const express = require('express');
const app = express();

//create const body
const bodyParser = require('body-parser');
//create mongoose
const mongoose = require('mongoose');

//Routers
const userRouter = require('./api/routers/users');
const tableRouter = require('./api/routers/tables');
const categoryRouter = require('./api/routers/categories');
const productRouter = require('./api/routers/products');

//connect mongoo db
mongoose.connect("mongodb://localhost:27017/XKitchen");
mongoose.Promise = global.Promise

//set up body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/tables', tableRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);

app.use((req, res, next) =>{
    console.log("Server is Running..")
    res.status(200).json({
        message: "hi, I'am learning Node JS"
    });
});

module.exports = app;