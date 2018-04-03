const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reference: { type: String, required: true, trim: true },
    guest: { type: String, required: true, trim: true },
    paid :{ type: Boolean, required: true, default: false},
    created : { type: Date, required: true, trim: true, default: Date.now()},
});

module.exports = mongoose.model('Reservation', reservationSchema, 'reservations');