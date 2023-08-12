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


module.exports = router