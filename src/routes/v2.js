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
const getProfile = require('../middleware/profile/getProfile')
const updateProfile = require('../middleware/profile/updateProfile')
const handleReport = require('../middleware/handleReport');
const heroImage = require('../middleware/upload/heroimg')
const profileImage = require('../middleware/upload/profileimg')
const models = require('../models');

const { uploadProfile, profileUpload, uploadStory, storyUpload } = require('../middleware/multer/multer')

// controller
router.get('/v2/home', isAuth, authHome)
router.get('/home', nonAuthHome)

router.post('/forgetPassword', forgetPassword, (req, res) => {
    console.log(req.users,);
    res.status(200).json(req.users)
})
router.post('/resetPassword/:id', changePass, (req, res) => {
    res.status(200).json('password changed successfully')
})

// profile dashboard get profile data
router.get('/v2/profile', isAuth, userProfile, (req, res) => {
    const data = req.data
    res.status(200).json({
        id: data.id, username: data.username, profileImg: data.img,
        heroImage: data.heroImg,
        birthday: data.birthday, password: data.password, email: data.email, gender: data.gender
    })
})

router.post('/heroImage', isAuth, userProfile, profileUpload.single('image'), uploadProfile, heroImage, (req, res) => {
    res.status(200).json('image uploaded')

})

router.post('/profileImage', isAuth, userProfile, profileUpload.single('image'), uploadProfile, profileImage, (req, res) => {
    res.status(200).json('image uploaded')

})
// profile dashboard updating username---password---gender----birthday
router.patch('/profile', isAuth, userProfile, updateProfile, (req, res) => {

    res.status(200).json('Profile updated')
})

router.get('/profile/:id', isAuth, getProfile, (req, res) => {
    res.status(200).json(req.data)
})

router.delete('/comment', isAuth, deleteComment)

async function deleteComment(req, res) {

}

// story 
router.get('/story', isAuth, story, (req, res) => res.status(200).json(req.data))

//report
router.post("/report", isAuth, handleReport);




router.post('/story', isAuth, storyUpload.single('image'), uploadStory, async (req, res, next) => {
    try {
        const obj = req.body;
        obj.storyUrl = req.image
        obj.userid = req.users.userId
        const data = await models.StoriesColl.create(obj);
        res.status(201).json({
            data
        });
    } catch (err) {
        next(err);
    }
})

// router.post('/createPost', isAuth, storyUpload.single('image'), uploadStory, async (req, res, next) => {
//     try {
//         const obj = req.body;
//         obj.imgurl = req.image
//         obj.userid = req.users.userId
//         const data = await models.newPostCOll.create(obj);
//         res.status(201).json({
//             data
//         });
//     } catch (err) {
//         next(err);
//     }
// })


module.exports = router