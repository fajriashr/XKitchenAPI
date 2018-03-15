const mongoose = require('mongoose');

//schema
const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: { type: String, required: true },
    initial: { type: String, required: true },
    name: { type: String, required: true }
});

module.exports = mongoose.model('Category', categorySchema, 'categories');
//penjelasan mongoose.model('User', userSchema, 'user')
//'User' memanggil model pada routers
//userSchema memanggil schema pada file ini
//'user' memanggil pada database
