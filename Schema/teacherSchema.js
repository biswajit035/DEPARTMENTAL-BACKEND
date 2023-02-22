const { mongoose } = require("mongoose");
const { Schema } = mongoose

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    fileid: {
        type: String,
        required: true
    }
})

module.exports = teacherSchema;