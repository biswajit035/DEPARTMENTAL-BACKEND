const { mongoose } = require("mongoose");
const { Schema } = mongoose

const UserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide a unique email"],
        unique: [true, "Username Exist"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    }
});

module.exports = UserSchema;