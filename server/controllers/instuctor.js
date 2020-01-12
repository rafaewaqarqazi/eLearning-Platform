const Users = require('../models/users');
require('dotenv').config();
const Courses = require('../models/courses');
const {sendEmail} = require("../helpers");
const fs = require('fs');
const mongoose = require('mongoose');
const { getVideoDurationInSeconds } = require('get-video-duration')
exports.createCourse = (req, res)=>{
    try {
        const {userId} = req.params;
        const {data} = req.body
        const newData = JSON.parse(data)
        console.log('TCL: exports.createCourse -> req.body', req.body)
        const newCourse = new Courses({
            ...newData,
            createdBy:  mongoose.Types.ObjectId(userId),
            coverImage: {
                originalname:req.file.originalname,
                filename:req.file.filename,
                type:req.file.mimetype
            }
        })
        newCourse.save().then(course => {
            res.json({success: true, course})
        })
    }catch (e) {
        console.log(e.message)
    }
  
};

exports.updateCourse = (req, res) => {
    res.json({message: 'Course Updated'})
    // const update = {
    //     $push:{
    //         "documentation.visionDocument":{
    //             "title":req.body.title,
    //             "abstract":req.body.abstract,
    //             "scope":req.body.scope,
    //             "majorModules":JSON.parse(req.body.majorModules),
    //             "status":'Waiting for Initial Approval',
    //             "uploadedAt":Date.now(),
    //             "documents":[{
    //                 "originalname":req.file.originalname,
    //                 "filename":req.file.filename,
    //                 "type":req.file.mimetype,
    //             }]
    //
    //         }
    //     }
    // };
    //
    // Projects.findByIdAndUpdate(req.params.id,update)
    //     .then(project =>{
    //         res.json({message: "Vision Document Uploaded"});
    //     })
    //     .catch(err => console.log(err.message));
    //

};

exports.getCourse =  (req,res)=>{
    res.json({course: 'This is Course'})
    // const update = {
    //     $push:{
    //         "documentation.finalDocumentation":{
    //             "status":'Waiting for Approval',
    //             "uploadedAt":Date.now(),
    //             "document":{
    //                 "originalname":req.file.originalname,
    //                 "filename":req.file.filename,
    //                 "type":req.file.mimetype,
    //             }
    //         }
    //     },
    //     $set:{
    //         "details.marks.supervisor":undefined
    //     }
    // };
    //
    // Projects.findByIdAndUpdate(req.body.projectId,update,{new:true})
    //     .select('documentation.finalDocumentation')
    //     .populate('details.supervisor','email')
    //     .populate('students','name student_details.regNo')
    //     .then(project =>{
    //         const emailData = {
    //             from: "noreply@node-react.com",
    //             to: project.details.supervisor.email,
    //             subject: "Final Documentation Upload | Review",
    //             text: `Dear Supervisor,\n ${project.students[0].name}, ${project.students[0].student_details.regNo} has uploaded his Project's Final Documentation,\n Please Review it for further actions`,
    //             html:  `
    //                 <p>Dear Supervisor,</p>
    //                 <p>Name: ${project.students[0].name}</p>
    //                 <p>Reg No: ${project.students[0].student_details.regNo}</p>
    //                 <p>has uploaded his Project's Final Documentation, Please review it for further actions</p>
    //                 <br/>
    //                 <p>Regards,</p>
    //             `,
    //             attachments:[{filename:req.file.originalname,path:`${process.env.CLIENT_URL}/static/pdf/${req.file.filename}`}]
    //         };
    //
    //         sendEmail(emailData);
    //         res.json(project);
    //     })
    //     .catch(err => console.log(err.message));


}
exports.getInstructorCourses =  (req,res)=>{
    Courses.find({createdBy: mongoose.Types.ObjectId(req.params.userId)})
    .populate('createdBy' ,'name profileImage')
    .populate('reviews.reviewedBy' ,'name profileImage')
    .then(courses => {
        res.json({success: true, courses})
    })
    .catch(error => {
        console.log(error.message)
    })
}
exports.uploadVideo =  (req,res)=>{
    try {
        getVideoDurationInSeconds(`http://localhost:3000/static/video/${req.file.filename}`).then((duration) => {
          
const minutes = Math.floor(duration / 60);
const seconds = duration - (minutes * 60);
res.json({
                success: true,
                file: {
                    originalname:req.file.originalname,
                    filename:req.file.filename,
                    type:req.file.mimetype,
                    duration:`${minutes}:${seconds}`
                }
            })
        })
        
    } catch (e) {
        console.log(e.message)
    }
};

exports.removeVideo = (req, res) => {
    const {videoName} = req.params;
    fs.unlink(`static/video/${videoName}`,err => {
        if(err){
            console.log(err)
        }
       res.json({success: true})
    });
}
exports.removeCourse =async (req, res) => {
    try{
        const {courseId} = req.params;
        console.log('TCL: exports.removeCourse -> courseId', courseId)
        const result = await Courses.remove({"_id":courseId});
        await res.json({success: true, result});
    }catch (e) {
        await res.json({success:false, error: e.message})
    }
}
