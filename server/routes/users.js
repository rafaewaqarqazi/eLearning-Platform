const express = require('express');
const router = express.Router();
const {
    marksDistribution,
    uploadProfileImage,
    changePassword,
    changeName,
    addNewBatch,
    removeBatch,
    fetchAllUsers,
    removeUser,
    fetchCommittees,
    fetchNotInCommittee,
    addMemberToCommittee,
    removeFromCommitteeDepartment,
    removeFromCommittee,
    fetchStudentsBarData,
    fetchAllSupervisors,
    fetchBatches,
    fetchMarksDistribution,
    getCourse
} = require('../controllers/users');
const upload = require('../upload');
const {requireSignin} = require('../controllers/auth');

router.get('/course/:courseId', getCourse)
router.put('/chairman/settings/marksDistribution',requireSignin,marksDistribution);
router.put('/chairman/settings/batch/add',requireSignin,addNewBatch);
router.put('/chairman/settings/batch/remove',requireSignin,removeBatch);
router.get('/chairman/settings/fetch/batches',fetchBatches);
router.get('/chairman/settings/fetch/marksDistribution',fetchMarksDistribution);


router.put('/profile/upload/:type',requireSignin,upload.single('file'),uploadProfileImage);

router.get('/fetchAll',requireSignin,fetchAllUsers);
router.get('/fetch/studentsBarData',requireSignin,fetchStudentsBarData);
router.get('/fetch/supervisors',requireSignin,fetchAllSupervisors);
router.get('/fetchCommittees',requireSignin,fetchCommittees);
router.get('/fetchNotInCommittee',requireSignin,fetchNotInCommittee);

router.put('/change/name',requireSignin,changeName);
router.put('/change/password',requireSignin,changePassword);

//Chairman
router.put('/committee/addMember',requireSignin,addMemberToCommittee);
router.put('/committee/remove/department',requireSignin,removeFromCommitteeDepartment);
router.put('/committee/remove/committee',requireSignin,removeFromCommittee);
router.delete('/remove/:userId',requireSignin,removeUser);
module.exports = router;