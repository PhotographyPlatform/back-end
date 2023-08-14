const express = require('express')
const notifiRoute = express.Router()
require('dotenv').config();
// notification Route
const { handleComment, handleFollowing, handlePost, handlelikes } = require('../middleware/notification/routeHandle')

notifiRoute.post('/v2/comment', handleComment);

notifiRoute.post('/v2/follow', handleFollowing)
notifiRoute.post('/v2/post', handlePost)

notifiRoute.post('/v2/likes', handlelikes);

module.exports = notifiRoute;