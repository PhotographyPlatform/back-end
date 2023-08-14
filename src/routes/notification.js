const express = require('express')
const notifiRoute = express.Router()
const isAuth = require('../auth/middleWare/bearer')
require('dotenv').config();
// notification Route
const { handleComment, handleFollowing, handlePost, handlelikes } = require('../middleware/notification/routeHandle')

notifiRoute.post('/v2/comment', isAuth, handleComment);

notifiRoute.post('/v2/follow', isAuth, handleFollowing)
notifiRoute.post('/v2/post', isAuth, handlePost)

notifiRoute.post('/v2/likes', isAuth, handlelikes);

module.exports = notifiRoute;