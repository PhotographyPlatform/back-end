'use strict'

const express = require('express')
const router = express.Router()
const isAuth = require('../auth/middleWare/bearer')
const authHome = require('../middleware/authHome')
const nonAuthHome = require('../middleware/nonAuthHome')

// controller
router.get('/v2/home', isAuth, authHome)
router.get('/home', nonAuthHome)

module.exports = router