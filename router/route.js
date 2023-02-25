const express = require('express')
const router = express.Router();
const { upload } = require('../gridFs')

const { testUser, teacherFetch, teacherAdd, delTeacher, studentFetch, studentAdd, delStudent, syllabusFetch, syllabusAdd, delsyllabus, routineFetch, routineAdd, delroutine, alumniFetch, alumniAdd, delalumni, noticeAdd, noticeFetch, delnotice } = require('../controllers/adminController.js');
const { showPdf, showimage, showAll, delPdf } = require('../controllers/fileController.js');

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

// Files
router.route('/files').get(showAll)
router.route('/files/pdf/:filename').get(showPdf)
router.route('/image/:filename').get(showimage)
router.route('/files/del/:id').delete(delPdf)

module.exports = router