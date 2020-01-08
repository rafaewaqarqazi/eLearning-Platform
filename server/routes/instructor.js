const express = require('express');
const {
    requireSignin,
    isInstructor
} = require("../controllers/auth");
const {userById} = require("../controllers/users");
const upload = require('../upload');
const router = express.Router();
const {
    createCourse,
    getCourse,
    updateCourse,
    uploadVideo,
    removeVideo,
    getInstructorCourses,
    removeCourse
} = require('../controllers/instuctor');
router.get('/course/:courseId',requireSignin,isInstructor,getCourse);
router.get('/courses/:userId',requireSignin,isInstructor,getInstructorCourses);
router.post('/course/:type/:userId',requireSignin,isInstructor,upload.single('coverImage'),createCourse);
router.put("/course",requireSignin,isInstructor,upload.single('file'), updateCourse);
router.post("/upload/video/:type", requireSignin, isInstructor, upload.single('video'), uploadVideo);
router.delete("/remove/:videoName", requireSignin, isInstructor, removeVideo)
router.delete("/remove/course/:courseId", requireSignin, isInstructor, removeCourse)
router.param("userId", userById);
module.exports = router;