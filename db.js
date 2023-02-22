require('dotenv').config();
const mongoose = require("mongoose");

// DB
const mongoURI = `mongodb+srv://${process.env.DATABASE_ID}:${process.env.DATABASE_PASS}@itbackend.4rilvpg.mongodb.net/?retryWrites=true&w=majority`;

// connection
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

conn.on('connected', () => {
    console.log('MongoDB connected!');
});
conn.on('error', (err) => {
    console.log('MongoDB connection error: ' + err);
});


module.exports = { conn, mongoURI }