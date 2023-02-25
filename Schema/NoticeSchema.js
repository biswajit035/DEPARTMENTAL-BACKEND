const { mongoose } = require("mongoose");
const { Schema } = mongoose

const pdfSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    pdfid: {
        type: String,
        required: true
    },
    pdfurl: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = pdfSchema;