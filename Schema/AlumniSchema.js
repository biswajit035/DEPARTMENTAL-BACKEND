const { mongoose } = require("mongoose");
const { Schema } = mongoose

const alumniSchema = new Schema({
    batch: {
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

module.exports = alumniSchema;