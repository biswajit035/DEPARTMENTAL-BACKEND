const { mongoose } = require("mongoose");
const { Schema } = mongoose

const pdfSchema = new Schema({
    batch: {
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
        default: () => new Date().toISOString().slice(0, 10)
    }
})

module.exports = pdfSchema;