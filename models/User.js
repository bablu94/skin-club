const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique : true },
    otp: { type: String },
});

module.exports = mongoose.model('User', userSchema);
