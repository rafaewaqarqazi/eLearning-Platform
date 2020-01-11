const express = require('express');
const {
    requireSignin,
    isStudent
} = require("../controllers/auth");
// const {userById} = require("../controllers/users");
const {
    enrollInCourse,
    leaveCourse,
    getStudentCourses,
    setWatchVideo,
    reviewCourse
} = require('../controllers/students');
const upload = require('../upload');
const router = express.Router();


router.put('/course/enroll',requireSignin,isStudent,enrollInCourse);
router.put('/course/leave',requireSignin,isStudent,leaveCourse);
router.put('/course/review',requireSignin,isStudent,reviewCourse);
router.get('/courses/:userId',requireSignin,isStudent,getStudentCourses);
router.put('/course/video/watch', requireSignin, isStudent, setWatchVideo)
module.exports = router;