const express = require('express')
const router = express.Router();
const { upload } = require('../gridFs')

const admin = require('../controllers/adminController.js');
const { showPdf, showimage, showAll, delPdf, delAll } = require('../controllers/fileController.js');
const controller = require('../controllers/authenticate');
const { localVariables } = require('../middleware/auth.js');
const {registerMail} = require('../controllers/mailer')


// router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/').get(admin.testUser)

// Teacher
router.route('/teacher/fetch').get(admin.teacherFetch)
router.route('/teacher/add').post(upload.single('file'), admin.teacherAdd)
router.route('/teacher/delete/:id').delete(upload.single('file'), admin.delTeacher)

// Student
router.route('/student/fetch').get(admin.studentFetch)
router.route('/student/add').post(upload.single('file'), admin.studentAdd)
router.route('/student/delete/:id').delete(upload.single('file'), admin.delStudent)

// Syllabus
router.route('/syllabus/fetch').get(admin.syllabusFetch)
router.route('/syllabus/add').post(upload.single('file'), admin.syllabusAdd)
router.route('/syllabus/delete/:id').delete(upload.single('file'), admin.delsyllabus)

// Routine
router.route('/routine/fetch').get(admin.routineFetch)
router.route('/routine/add').post(upload.single('file'), admin.routineAdd)
router.route('/routine/delete/:id').delete(upload.single('file'), admin.delroutine)

// Alumni
router.route('/alumni/fetch').get(admin.alumniFetch)
router.route('/alumni/add').post(upload.single('file'), admin.alumniAdd)
router.route('/alumni/delete/:id').delete(upload.single('file'), admin.delalumni)

// Notice
router.route('/notice/fetch').get(admin.noticeFetch)
router.route('/notice/add').post(upload.single('file'), admin.noticeAdd)
router.route('/notice/delete/:id').delete(upload.single('file'), admin.delnotice)

// Event
router.route('/event/fetch').get(admin.eventFetch)
router.route('/event/add').post(upload.array('file',5), admin.eventAdd)
router.route('/event/delete/:id').delete(admin.deleteEvent)

// Placement
router.route('/placement/year').get(admin.yearFetch)
router.route('/placement/year/:id').get(admin.specificYearFetch)
router.route('/placement/add/year').post(upload.array(), admin.addYear)
router.route('/placement/delete/:year').delete(admin.deleteYear)
router.route('/placement/add/company/:year').post(upload.array(), admin.addCompany)
router.route('/placement/delete/company/:year/:id').delete(admin.deleteCompany)


// Files
router.route('/files').get(showAll)
router.route('/files/pdf/:filename').get(showPdf)
router.route('/files/image/:filename').get(showimage)
router.route('/files/del/:id').delete(delPdf)
router.route('/files/del/all').delete(delAll)

// ----------------   AUTHENTICATE -------------------
router.route('/login').post(controller.verifyUser, controller.login); 
router.route('/logout').post(controller.logout);

router.route('/registerMail').post(registerMail); // send the email

/** GET Methods */
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) 
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP


/** PUT Methods */
router.route('/createPassword').post(controller.verifyUser, controller.createPassword);
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);

module.exports = router