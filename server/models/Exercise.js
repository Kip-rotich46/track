const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Associate with user
    name: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories_burned: { type: Number, required: true },
})

module.exports = mongoose.model('Exercise', exerciseSchema);