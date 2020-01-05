const express = require('express');
const {userById} = require("../controllers/users");
const  {
    signup,
    verifyEmail,
    signin,
    getUser,
    forgotPassword,
    resetPassword
} = require('../controllers/auth');
const router = express.Router();

router.get('/:userId',getUser);
router.post('/signup', signup);
router.put('/verify-email',verifyEmail);
router.post('/signin', signin);
router.put('/forgot-password',forgotPassword);
router.put('/reset-password',resetPassword);

router.param("userId", userById);
module.exports = router;