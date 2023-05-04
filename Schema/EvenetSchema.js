const { mongoose } = require("mongoose");
const { Schema } = mongoose
const moment = require('moment');

const EventSchema = new Schema({
    desc: {
        type: String,
        required: true
    },
    title:{
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
    }],
    date: {
        type: Date,
        default: moment().toDate()
    }
}, {
    autoIndex: false
})

module.exports = EventSchema;