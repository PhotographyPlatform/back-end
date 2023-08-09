'use strict'

const express = require('express')
const router = express.Router()
const story = require('../middleware/stories')
const isAuth = require('../auth/middleWare/bearer')
const authHome = require('../middleware/authHome')
const nonAuthHome = require('../middleware/nonAuthHome')
const changePass = require('../middleware/restPass/changePass')
const change = require('../middleware/restPass/nodemailer')

// controller
router.get('/v2/home', isAuth, authHome)
router.get('/home', nonAuthHome)
router.post('/forgetPassword', change, (req, res) => {
    res.status(200).json('Email sent successfully')
})
router.post('/resetPassword/:id', changePass, (req, res) => {
    res.status(200).json('password changed successfully')
})
// router.get('/story/:id', isAuth, story, (req, res) => res.status(200).json(req.data))
router.get('/story', isAuth, story, (req, res) => res.status(200).json(req.data))

module.exports = router