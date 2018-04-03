const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    code : { type : String, required : true },
    initial : { type : String, required : true },
    name : { type : String, required : true }
});

module.exports = mongoose.model('Category', categorySchema, 'categories');