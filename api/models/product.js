const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    category : { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    code : { type: String, required: true },
    initial : { type: String, required: true },
    name : { type: String, required: true },
    description : { type: String, required: true },
    price: { type: Number, default: 1 }
});

module.exports = mongoose.model('Product', productSchema, 'products');