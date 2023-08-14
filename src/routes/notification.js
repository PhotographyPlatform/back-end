const express = require('express')
const modules = require('../models')
const notifiRoute = express.Router()
const isAuth = require('../auth/middleWare/bearer')
require('dotenv').config();
// notification Route
const { handleComment, handleFollowing, handlePost, handlelikes } = require('../middleware/notification/routeHandle')

notifiRoute.post('/notification/comment', isAuth, handleComment);

notifiRoute.post('/notification/follow', isAuth, handleFollowing)
notifiRoute.post('/notification/post', isAuth, handlePost)

notifiRoute.post('/notification/likes', isAuth, handlelikes);

module.exports = notifiRoute;