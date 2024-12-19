const mongoose = require('mongoose');

const chatSchecma = new mongoose.Schema({
    message: { type: String, required: true },
    dateCreation: { type: Date, required: true },
});

module.exports = mongoose.model('chat', chatSchecma);