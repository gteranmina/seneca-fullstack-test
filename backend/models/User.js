const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    address: String,
    birthDate: Date,
    isActive: { type: Boolean, default: false },
    lastLogin: Date,
    activationToken: String,
    resetToken: String,
});

module.exports = mongoose.model('User', userSchema);
