const express = require('express')
const notifiRoute = express.Router()
const isAuth = require('../auth/middleWare/bearer')
const { uploadProfile, profileUpload, uploadStory, storyUpload } = require('../middleware/multer/multer')

require('dotenv').config();
// notification Route


const { handleComment, handleFollowing, handlePost, handlelikes } = require('../middleware/notification/routeHandle');

notifiRoute.post('/notification/comment', isAuth, handleComment);

notifiRoute.post('/notification/follow', isAuth, handleFollowing);

notifiRoute.post('/notification/post', isAuth, storyUpload.single('image'), uploadStory, handlePost);

notifiRoute.post('/notification/likes', isAuth, handlelikes);

module.exports = notifiRoute;