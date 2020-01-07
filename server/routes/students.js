const express = require('express');
const {
    requireSignin,
    isStudent
} = require("../controllers/auth");
// const {userById} = require("../controllers/users");
const {
    enrollInCourse,
    leaveCourse,
    getStudentCourses
} = require('../controllers/students');
const upload = require('../upload');
const router = express.Router();


router.put('/course/enroll',requireSignin,isStudent,enrollInCourse);
router.put('/course/leave',requireSignin,isStudent,leaveCourse);
router.get('/courses/:userId',requireSignin,isStudent,getStudentCourses);
// router.get('/fetch/programOffice',fetchForProgramOffice);
//
// //Students
// router.put('/additionalFile/vision-doc/:type',requireSignin,isStudent,upload.single('file'),resubmitVisionDoc);
// router.put("/project/vision-doc/:type/:id",requireSignin,isStudent,upload.single('file'), uploadVisionDocument);
// router.put('/project/finalDocumentation/:type',requireSignin,isStudent,upload.single('file'),uploadFinalDocumentation);
// router.get('/notEnrolled/:userId',requireSignin,isStudent,getNotEnrolledStudents);
//
// router.param("userId", userById);
module.exports = router;