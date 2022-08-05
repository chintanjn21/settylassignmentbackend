const mongoose = require('mongoose');
const { Schema } = mongoose;

const CarSchema = new Schema({
    car_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('car', CarSchema);