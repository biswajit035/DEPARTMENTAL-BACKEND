const express = require('express')
const router = express.Router();
const { upload } = require('../gridFs')

const { testUser, teacherFetch, teacherAdd, delTeacher, studentFetch, studentAdd, delStudent, syllabusFetch, syllabusAdd, delsyllabus, routineFetch, routineAdd, delroutine, alumniFetch, alumniAdd, delalumni, noticeAdd, noticeFetch, delnotice, addYear, yearFetch, specificYearFetch, deleteYear, addCompany, deleteCompany, eventAdd, eventFetch, deleteEvent } = require('../controllers/adminController.js');
const { showPdf, showimage, showAll, delPdf, delAll } = require('../controllers/fileController.js');

// router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/').get(testUser)

// Teacher
router.route('/teacher/fetch').get(teacherFetch)
router.route('/teacher/add').post(upload.single('file'), teacherAdd)
router.route('/teacher/delete/:id').delete(upload.single('file'), delTeacher)

// Student
router.route('/student/fetch').get(studentFetch)
router.route('/student/add').post(upload.single('file'), studentAdd)
router.route('/student/delete/:id').delete(upload.single('file'), delStudent)

// Syllabus
router.route('/syllabus/fetch').get(syllabusFetch)
router.route('/syllabus/add').post(upload.single('file'), syllabusAdd)
router.route('/syllabus/delete/:id').delete(upload.single('file'), delsyllabus)

// Routine
router.route('/routine/fetch').get(routineFetch)
router.route('/routine/add').post(upload.single('file'), routineAdd)
router.route('/routine/delete/:id').delete(upload.single('file'), delroutine)

// Alumni
router.route('/alumni/fetch').get(alumniFetch)
router.route('/alumni/add').post(upload.single('file'), alumniAdd)
router.route('/alumni/delete/:id').delete(upload.single('file'), delalumni)

// Notice
router.route('/notice/fetch').get(noticeFetch)
router.route('/notice/add').post(upload.single('file'), noticeAdd)
router.route('/notice/delete/:id').delete(upload.single('file'), delnotice)

// Event
router.route('/event/fetch').get(eventFetch)
router.route('/event/add').post(upload.array('file',5), eventAdd)
router.route('/event/delete/:id').delete(deleteEvent)

// Placement
router.route('/placement/year').get(yearFetch)
router.route('/placement/year/:id').get(specificYearFetch)
router.route('/placement/add/year').post(upload.array(), addYear)
router.route('/placement/delete/:year').delete(deleteYear)
router.route('/placement/add/company/:year').post(upload.array(), addCompany)
router.route('/placement/delete/company/:year/:id').delete(deleteCompany)


// Files
router.route('/files').get(showAll)
router.route('/files/pdf/:filename').get(showPdf)
router.route('/files/image/:filename').get(showimage)
router.route('/files/del/:id').delete(delPdf)
router.route('/files/del/all').delete(delAll)

module.exports = router