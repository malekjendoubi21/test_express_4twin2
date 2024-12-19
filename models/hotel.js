const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    datefabrication: { type: Date, required: true },
    nbrrooms: { type: Number, default: 10 },
});

module.exports = mongoose.model('Hotel', hotelSchema);