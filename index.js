const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const path = require("path");
let port = process.env.PORT || 8000;
var cors = require('cors')
app.use(cors());

const router = require('./router/route.js');
app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.use('/api', router)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})