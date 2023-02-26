const { mongoose } = require("mongoose");
const { Schema } = mongoose

const PlacementSchema = new Schema({
    year: {
        type: String,
        required: true
    },
    records: [{
        company: {
            type: String,
        },
        count: {
            type: Number,
        },
    }]
}, {
    autoIndex: false
})

module.exports = PlacementSchema;