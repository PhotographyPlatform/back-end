'use strict'

const express = require('express')
const router = express.Router()
const isAuth = require('../auth/middleWare/bearer')
const authHome = require('../middleware/authHome')
const nonAuthHome = require('../middleware/nonAuthHome')
const checkEmail = require('../middleware/restPass/restPass')
const changePass = require('../middleware/restPass/changePass')

// controller
router.get('/v2/home', isAuth, authHome)
router.get('/home', nonAuthHome)
// router.get('restPassword',)
router.post('/changePass', checkEmail, changePass, (req, res) => {
    res.status(200).json('passWord changed')
})
module.exports = router