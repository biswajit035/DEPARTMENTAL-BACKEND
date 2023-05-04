const { mongoose } = require("mongoose");

const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide a unique email"],
        unique: [true, "Username Exist"]
    },
    otp: {
        type: Number,
        required: true
    },
    otpExpiration: {
        type: Date,
        required: true,
        default: Date.now(),
        index: { expires: '1m' }
    }
});

module.exports = OtpSchema;