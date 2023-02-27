const { mongoose } = require("mongoose");
const { Schema } = mongoose

const EventSchema = new Schema({
    desc: {
        type: String,
        required: true
    },
    image: [{
        imageurl: {
            type: String,
            required: true
        },
        imageid: {
            type: String,
            required: true
        }
    }]
}, {
    autoIndex: false
})

module.exports = EventSchema;