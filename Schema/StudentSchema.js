const { mongoose } = require("mongoose");
const { Schema } = mongoose

const StudentSchema = new Schema({
    batch: {
        type: String,
        required: true
    },
    pdfurl: {
        type: String,
        required: true
    },
    pdfid: {
        type: String,
        required: true
    }
})

module.exports = StudentSchema;