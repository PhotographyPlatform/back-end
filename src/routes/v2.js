'use strict'

const express = require('express')
const router = express.Router()
const story = require('../middleware/stories')
const isAuth = require('../auth/middleWare/bearer')
const authHome = require('../middleware/authHome')
const nonAuthHome = require('../middleware/nonAuthHome')
const changePass = require('../middleware/restPass/changePass')
const forgetPassword = require('../middleware/restPass/nodemailer')
const userProfile = require('../middleware/profile/profile')
const updateProfile = require('../middleware/profile/updateProfile')
const modules = require('../models');
// controller
router.get('/v2/home', isAuth, authHome)
router.get('/home', nonAuthHome)

router.post('/forgetPassword', forgetPassword, (req, res) => {
    res.status(200).json('Email sent successfully')
})
router.post('/resetPassword/:id', changePass, (req, res) => {
    res.status(200).json('password changed successfully')
})

// profile dashboard get profile data
router.get('/profile', isAuth, userProfile, (req, res) => {
    const data = req.data
    res.status(200).json({
        id: data.id, username: data.username, profileImg: data.img,
        birthday: data.birthday, password: data.password, email: data.email, gender: data.gender
    })
})

// profile dashboard updating username---password---gender----birthday
router.patch('/profile', isAuth, userProfile, updateProfile, (req, res) => {
    res.status(200).json('Profile updated')
})

router.delete('/comment', isAuth, deleteComment)

async function deleteComment(req, res) {

}

// story 
router.get('/story', isAuth, story, (req, res) => res.status(200).json(req.data))

//report
router.post("/report", handleReport);

async function handleReport(req, res, next) {
    try {
        const record = req.body
        // if (await reportIsValid(record.userId, record.actionId, record.actionType)) {
        if (true) {
            const respons = await modules.reportCollection.create(record);
            res.status(201).json(respons);
        } else res.status(400).json("Data Not Valid !!");
    } catch (err) {
        next(err)
    }
}

// This function searches to determine if the record exists and if the report has been added before.
async function reportIsValid(userId, actionId, actionType) {
    try {
        const existingReportRecord = await modules.report.findOne({ where: { userId: userId, actionId: actionId, actionType: actionType } })
        let dataValid = false

        if (actionType === "comment") {
            const record = await modules.comment.findOne({ where: { id: actionId } })
            dataValid = record
        } else if (actionType === "post") {
            const record = await modules.post.findOne({ where: { id: actionId } })
            dataValid = record
        } else if (actionType === 'user') {
            const record = await modules.user.findOne({ where: { id: actionId } })
            dataValid = record
        }
        return !existingReportRecord && dataValid;
    } catch (err) {
        console.log(err);
    }
}


module.exports = router