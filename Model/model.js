const { conn } = require('../db')
const teacherSchema = require('../Schema/teacherSchema')
const pdfSchema = require('../Schema/PdfSchema')


const teacher = conn.model('teacherModel', teacherSchema)
const student = conn.model('studentModel', pdfSchema)
const syllabus = conn.model('syllabusModel', pdfSchema)
const routine = conn.model('routineModel', pdfSchema)
const alumni = conn.model('alumnimodel', pdfSchema)


module.exports = { teacher,student,syllabus,routine,alumni }