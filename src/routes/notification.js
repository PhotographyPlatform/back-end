const express = require('express')
const modules = require('../models')
const notifiRoute = express.Router()
require('dotenv').config();
// notification Route
const { handleComment, handleFollowing, handlePost, handlelikes } = require('../middleware/notification')

notifiRoute.post('/notification/comment', handleComment);

notifiRoute.post('/notification/follow', handleFollowing)
notifiRoute.post('/notification/post', handlePost)

notifiRoute.post('/notification/likes', handlelikes);

module.exports = notifiRoute;