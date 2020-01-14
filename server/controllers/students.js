const Users = require('../models/users');
const Courses = require('../models/courses')
require('dotenv').config();
const {sendEmail} = require("../helpers");

exports.enrollInCourse = (req, res)=>{
    Courses.findOneAndUpdate({_id:req.body.courseId},
        {
            $push: {
                "students":req.body.studentId
            }
        },{
            new: true
        }
        ).populate('createdBy', 'name profileImage')
        .populate('reviews.reviewedBy' ,'name profileImage')
        .then(course => {
            Users.findOne({_id: req.body.studentId})
                .then(user => {
                    const emailText = `Dear Student,/n You have Successfully enrolled in ${course.title} course`;
                    const emailHtml =
                        `
                    <p>Dear Student,</p>
                    <p>You have Successfully enrolled in ${course.title} course.</p>
                    <p>enjoy your learning</p>
                `

                    const emailData = {
                        from: "noreply@node-react.com",
                        to: user.email,
                        subject: "Course Enrolled",
                        text: emailText,
                        html: emailHtml
                    };

                    sendEmail(emailData);
                    res.json({success:true, course})
                })
                .catch(err => {
                    res.status(400).json({error:err})
                })
        })
        .catch(err => {
            res.status(400).json({error:err})
        })
};
exports.leaveCourse = (req, res)=>{
    Courses.findOneAndUpdate({_id:req.body.courseId},
        {
            $pull: {
                "students":req.body.studentId
            }
        },{new: true}
        ).populate('createdBy', 'name profileImage')
      .populate('reviews.reviewedBy' ,'name profileImage')
        .then(course => {
            Users.findOne({_id: req.body.studentId})
                .then(user => {
                    const emailText = `Dear Student,/n You have Successfully left the ${course.title} course`;
                    const emailHtml =
                        `
                    <p>Dear Student,</p>
                    <p>You have Successfully left the ${course.title} course.</p>
                `

                    const emailData = {
                        from: "noreply@node-react.com",
                        to: user.email,
                        subject: "Course Left",
                        text: emailText,
                        html: emailHtml
                    };

                    sendEmail(emailData);
                    res.json({success:true, course})
                })
                .catch(err => {
                    res.status(400).json({error:err})
                })
        })
        .catch(err => {
            res.status(400).json({error:err})
        })
};
exports.getStudentCourses =  (req,res)=>{
    Courses.find({students: req.params.userId})
    .populate('createdBy' ,'name profileImage')
      .populate('reviews.reviewedBy' ,'name profileImage')
        .then(courses => {
            res.json({success: true, courses})
        })
        .catch(error => {
            console.log(error.message)
        })
};
exports.setWatchVideo = async (req, res) => {
    try {
        const {courseId, contentId, userId} = req.body
        const result = await Courses.updateOne(
          {"_id":courseId, "content._id":contentId},
          {
              $addToSet:{
                  "content.$.watchedBy":userId
              }
          }
        )
        if (result.ok) {
            await res.json({success: true, result})
        }else {
            await res.json({success: false, result})
        }

    }catch (e) {
        await res.json({success: false, error: e.message})
    }
}
exports.reviewCourse = async (req, res) => {
    try {
        const {courseId, rating, reviewedBy, text, createdAt} = req.body
        const result = await Courses.findOneAndUpdate(
          {"_id":courseId},
          {
                $addToSet:{
                  "reviews":{
                      ratings: rating,
                      reviewedBy,
                      text,
                      createdAt
                  }
                }
          },
          {new: true}
        )
          .populate('createdBy' ,'name profileImage')
          .populate('reviews.reviewedBy' ,'name profileImage')

        await res.json({success: true, result})

    }catch (e) {
        await res.json({success: false, error: e.message})
    }
}