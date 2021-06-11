const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    message_id: mongoose.Schema.Types.ObjectId,
    message: String,
    date: Date,
})

module.exports = mongoose.model('Message', MessageSchema);