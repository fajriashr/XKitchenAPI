const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    code : { type : String, required : true },
    seat : { type : Number, required : true },
    description : { type : String, required : true }
});

module.exports = mongoose.model('Table', tableSchema, 'tables');