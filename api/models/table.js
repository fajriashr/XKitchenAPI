const mongoose = require('mongoose');

//schema
const tableSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: { type: String, required: true },
    seat: { type: Number, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Table', tableSchema, 'tables');
//penjelasan mongoose.model('User', userSchema, 'user')
//'User' memanggil model pada routers
//userSchema memanggil schema pada file ini
//'user' memanggil pada database
