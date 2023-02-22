const express = require('express')
const app = express()
const db = require("./db")
var cors = require('cors')
app.use(cors());
let port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})
// teacher
app.use('/api/teacher',require('./Routes/Teacher'))
app.use('/api/student',require('./Routes/Students'))
app.use('/api/syllabus',require('./Routes/Syllabus'))
app.use('/api/routine',require('./Routes/Routine'))
app.use('/api/alumni',require('./Routes/Alumni'))
app.use('/api/files',require('./Routes/File'))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})