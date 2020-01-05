const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
require('dotenv').config();
const User = require('../models/users');
const {sendEmail} = require("../helpers");


exports.signup = async (req, res)=>{

    const userExists = await User.findOne({email: req.body.email});
    if (userExists) return res.status(403).json({
        error: "User Already Exists"
    });
    const emailVerCode = Math.floor(Math.random() * 1000000);

    const user = await new User({
        ...req.body,
        emailVerificationCode: emailVerCode
    });
    const newUser = await user.save();
    if (newUser){
        const {email}=req.body;
        const emailData = {
            from: "noreply@node-react.com",
            to: email,
            subject: "Email Verification Instructions",
            text: `Please use the following code for email verification ${emailVerCode}`,
            html: `<p>Please use the following code for email verification</p> <h3>${emailVerCode}</h3>`
        };

        sendEmail(emailData)
        await res.json({
            _id:newUser._id,
            message: `Please check your email for Verification`
        });
    }
};

exports.signin = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email},(err, user) => {
        if (err || !user){
            return res.status(401).json({
                error:"User does not exist"
            })
        }

        if (!user.authenticate(password)){
            return res.status(401).json({
                error:"Email/Password does not match"
            })
        }
        //Generating Key
        const {_id, name, email, role,isEmailVerified} = user;

        const token = jwt.sign({ _id, role},process.env.JWT_SECRET);
        const loggedInUser = {
            _id,
            email,
            name,
            role,
            isEmailVerified
        };
        return res.json({
            token,
            user:loggedInUser
        });
    })
};


exports.isInstructor = (req, res, next) => {
    let instructor = req.auth && req.auth.role === "Instructor";
    if (!instructor){
        return res.status(403).json({
            error: "You are Not Authorized to perform this action"
        })
    }
    next();
};
exports.isStudent = (req, res, next) => {
    let student = req.auth && req.auth.role === "Student";
    if (!student){
        return res.status(403).json({
            error: "You are Not Authorized to perform this action"
        })
    }
    next();
};


exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});


exports.verifyEmail = (req, res) => {
    const { emailVerificationCode,_id } = req.body;
        console.log(req.body);
    User.findOne({$and:[{_id},{emailVerificationCode}]}).then(user => {
        // if err or no user
        if (!user)
            return res.status(401).json({
                error: "Invalid Code!"
            });


        const updatedFields = {
            isEmailVerified:true,
            emailVerificationCode: undefined
        };

        Object.assign(user,updatedFields);


        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({
                message: `Your Email Has been verified. You can Sign-in Now`
            });
        });
    });
};

// add forgotPassword and resetPassword methods
exports.forgotPassword = (req, res) => {
    if (!req.body) return res.status(400).json({ message: "No request body" });
    if (!req.body.email)
        return res.status(400).json({ message: "No Email in request body" });

    const { email } = req.body;

    // find the user based on email
    User.findOne({ email }, (err, user) => {
        // if err or no user
        if (err || !user)
            return res.status("401").json({
                error: "User with this email does not exist!"
            });

        // generate a token with user id and secret
        const token = jwt.sign(
            { _id: user._id, iss: "NODEAPI" },
            process.env.JWT_SECRET
        );

        // email data
        const emailData = {
            from: "noreply@node-react.com",
            to: email,
            subject: "Password Reset Instructions",
            text: `Please use the following link to reset your password: ${
                process.env.CLIENT_URL
            }/reset-password/${token}`,
            html: `<p>Please use the following link to reset your password:</p> <p>${
                process.env.CLIENT_URL
            }/reset-password/${token}</p>`
        };

        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.json({ message: err });
            } else {
                sendEmail(emailData);
                return res.status(200).json({
                    message: `Email has been sent with reset password link.`
                });
            }
        });
    });
};


exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    User.findOne({ resetPasswordLink }, (err, user) => {
        // if err or no user
        if (err || !user)
            return res.status("401").json({
                error: "Invalid Link!"
            });

        const updatedFields = {
            password: newPassword,
            resetPasswordLink: ""
        };

        Object.assign(user,updatedFields);
        user.updated = Date.now();

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({
                message: `Great! You can login with new Password Now.`
            });
        });
    });
};
exports.getUser = (req,res)=>{
    res.json(req.profile)
};

exports.getChairmanName = async (req, res)=>{
    try {
        const chairman = await User.findOne({role:'Chairman DCSSE'})
            .select('-_id name');
        await res.json(chairman)
    }
    catch (e) {
        await res.json({error:e.message})
    }

}