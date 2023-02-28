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
});

module.exports = UserSchema;