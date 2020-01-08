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
        .then(courses => {
            res.json({success: true, courses})
        })
        .catch(error => {
            console.log(error.message)
        })
}
// exports.uploadVisionDocument = (req, res) => {
//        const update = {
//            $push:{
//                "documentation.visionDocument":{
//                            "title":req.body.title,
//                            "abstract":req.body.abstract,
//                            "scope":req.body.scope,
//                            "majorModules":JSON.parse(req.body.majorModules),
//                             "status":'Waiting for Initial Approval',
//                             "uploadedAt":Date.now(),
//                             "documents":[{
//                                 "originalname":req.file.originalname,
//                                 "filename":req.file.filename,
//                                 "type":req.file.mimetype,
//                             }]
//
//               }
//            }
//        };
//
//         // Projects.findByIdAndUpdate(req.params.id,update)
//         // .then(project =>{
//         //     res.json({message: "Vision Document Uploaded"});
//         // })
//         //     .catch(err => console.log(err.message));
//
//
// };
//
// exports.uploadFinalDocumentation =  (req,res)=>{
//
//     const update = {
//         $push:{
//             "documentation.finalDocumentation":{
//                 "status":'Waiting for Approval',
//                 "uploadedAt":Date.now(),
//                 "document":{
//                     "originalname":req.file.originalname,
//                     "filename":req.file.filename,
//                     "type":req.file.mimetype,
//                 }
//             }
//         },
//         $set:{
//             "details.marks.supervisor":undefined
//         }
//     };
//
//     Projects.findByIdAndUpdate(req.body.projectId,update,{new:true})
//         .select('documentation.finalDocumentation')
//     .populate('details.supervisor','email')
//         .populate('students','name student_details.regNo')
//         .then(project =>{
//             const emailData = {
//                 from: "noreply@node-react.com",
//                 to: project.details.supervisor.email,
//                 subject: "Final Documentation Upload | Review",
//                 text: `Dear Supervisor,\n ${project.students[0].name}, ${project.students[0].student_details.regNo} has uploaded his Project's Final Documentation,\n Please Review it for further actions`,
//                 html:  `
//                     <p>Dear Supervisor,</p>
//                     <p>Name: ${project.students[0].name}</p>
//                     <p>Reg No: ${project.students[0].student_details.regNo}</p>
//                     <p>has uploaded his Project's Final Documentation, Please review it for further actions</p>
//                     <br/>
//                     <p>Regards,</p>
//                 `,
//                 attachments:[{filename:req.file.originalname,path:`${process.env.CLIENT_URL}/static/pdf/${req.file.filename}`}]
//             };
//
//             sendEmail(emailData);
//             res.json(project);
//         })
//         .catch(err => console.log(err.message));
//
//
// }
// exports.getNotEnrolledStudents =async (req, res)=>{
//    const projects = await Projects.aggregate([
//         {
//             $unwind: '$students'
//         },
//         {
//             $group:{_id:'$students'}
//         }
//     ]).exec();
//     let s =[];
//     projects.map((project,i) =>{
//         s[i]=project._id
//     });
//    const ids = [
//         ...s,
//         req.params.userId
//     ];
//     const users = await Users.where('role').equals('Student')
//         .where({"student_details.isEligible": "Eligible"})
//         .where({"student_details.department": req.profile.student_details.department})
//         .where('_id').nin(ids)
//         .select('_id name email role student_details');
//     await res.json(users)
// };
// exports.fetchForProgramOffice =async (req, res)=>{
//     try {
//         const students = await Users.find({
//             $and:
//                 [
//                     {role:'Student'},
//                     {
//                         $or:[
//                             {"student_details.isEligible":'Pending'},
//                             {"student_details.isEligible":'Not Eligible'}
//                             ]
//                     }
//                 ]
//         }).select('_id name email student_details department');
//
//         await res.json(students)
//     }catch (e) {
//         res.status(400).json(e.message)
//     }
// };
//
// exports.resubmitVisionDoc =async (req,res)=>{
//     try {
//         const {projectId,documentId} = req.body;
//         console.log('File',req.file);
//
//         const result = await Projects.updateOne(
//             {"_id":projectId, "documentation.visionDocument._id":documentId},
//             {
//                 $push:{
//                     "documentation.visionDocument.$.documents":{
//                         "originalname":req.file.originalname,
//                         "filename":req.file.filename,
//                         "type":req.file.mimetype
//                     }
//                 }
//             }
//         )
//
//         await res.json({
//             originalname:req.file.originalname,
//             filename:req.file.filename,
//             type:req.file.mimetype
//         })
//     }catch (e) {
//         await res.json({error:e.message})
//     }
//
//
// }