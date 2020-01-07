const Users = require('../models/users');
require('dotenv').config();
const Courses = require('../models/courses');
const {sendEmail} = require("../helpers");
const fs = require('fs');
const mongoose = require('mongoose');
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
    // Users.findOneAndUpdate({_id:req.params.userId},
    //     {"student_details.isEligible":req.body.status}
    // )
    //     .then(user => {
    //         const emailText = req.body.status === 'Eligible'?
    //             `Dear Student,/nYou are Eligible for FYP, please click on the following link to start your Project./n${
    //                 process.env.CLIENT_URL
    //             }/student/project/create`
    //             :
    //             'Dear Student,/n You are NOT ELIGIBLE for FYP YET. For further details please visit program office';
    //         const emailHtml =req.body.status === 'Eligible'?
    //             `
    //                 <p>Dear Student,</p>
    //                 <p>You are Eligible for FYP, please click on the following link to start your Project.</p>
    //                 <p>${process.env.CLIENT_URL}/student/project/create</p>
    //             `:
    //             `
    //             <p>Dear Student,</p>
    //                 <p>You are <b>NOT ELIGIBLE</b> for FYP YET. For further details please visit program office</p>
    //             `;
    //
    //         const emailData = {
    //             from: "noreply@node-react.com",
    //             to: user.email,
    //             subject: "Eligibility Status Update | Program Office",
    //             text: emailText,
    //             html: emailHtml
    //         };
    //
    //         sendEmail(emailData);
    //         res.json({message:'Success'})
    //     })
    //     .catch(err => {
    //         res.status(400).json({error:err})
    //     })
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
    .then(courses => {
        res.json({success: true, courses})
    })
    .catch(error => {
        console.log(error.message)
    })
}
exports.uploadVideo =  (req,res)=>{
    try {
        res.json({
            success: true,
            file: {
                originalname:req.file.originalname,
                filename:req.file.filename,
                type:req.file.mimetype
            }
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