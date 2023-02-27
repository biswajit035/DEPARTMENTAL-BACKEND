const { conn } = require('../db')
const teacherSchema = require('../Schema/teacherSchema')
const pdfSchema = require('../Schema/PdfSchema')
const noticeSchema = require('../Schema/NoticeSchema')
const placementSchema = require('../Schema/PlacementSchema')
const eventSchema = require('../Schema/EvenetSchema')


const teacher = conn.model('teacherModel', teacherSchema)
const student = conn.model('studentModel', pdfSchema)
const syllabus = conn.model('syllabusModel', pdfSchema)
const routine = conn.model('routineModel', pdfSchema)
const alumni = conn.model('alumnimodel', pdfSchema)
const notice = conn.model('noticemodel', noticeSchema)
const placement = conn.model('placementmodel', placementSchema)
const event = conn.model('eventmodel', eventSchema)


module.exports = { teacher, student, syllabus, routine, alumni, notice, placement,event }