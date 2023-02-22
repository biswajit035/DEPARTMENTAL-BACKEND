const { conn } = require('../db')
// const StudentSchema = require('../schema/StudentSchema')
// const PlacementSchema = require('../schema/PlacementSchema')
const teacherSchema = require('../schema/teacherSchema')
const StudentSchema = require('../Schema/StudentSchema')
const SyllabusSchema = require('../Schema/SyllabusSchema')
const RoutineSchema = require('../Schema/RoutineSchema')
const AlumniSchema = require('../Schema/AlumniSchema')


const teacher = conn.model('teacherModel', teacherSchema)
const student = conn.model('studentModel', StudentSchema)
const syllabus = conn.model('syllabusModel', SyllabusSchema)
const routine = conn.model('routineModel', RoutineSchema)
const alumni = conn.model('alumnimodel', AlumniSchema)
// const btechStudent = conn.model('BtechStudentModel', StudentSchema)
// const mtechStudent = conn.model('MtechStudentModel', StudentSchema)
// const phdStudent = conn.model('PhdStudentModel', StudentSchema)
// const placement = conn.model('placementModel', PlacementSchema)

module.exports = { teacher,student,syllabus,routine,alumni }