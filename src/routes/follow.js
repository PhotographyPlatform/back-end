const express = require('express')
const modules = require('../models/index')
const { newPostCOll, newUserCOll } = require("../models")
const followRoute = express.Router()
const isAuth = require('../auth/middleWare/bearer')

followRoute.get('/Followers', isAuth, Followers)
followRoute.get('/Following', isAuth, following)
followRoute.get('/home', isAuth, homeHandler)
followRoute.delete('/unfollow', isAuth, unFollowHandler)

async function Followers(req, res, next) {
    try {
        const id = req.users.userId
        const theRecord = await newUserCOll.followers(id, modules.user);
        res.status(200).json(theRecord)
    } catch (err) {
        next(err)
    }
}

async function following(req, res, next) {
    try {
        const id = req.users.userId
        const theRecord = await newUserCOll.following(id, modules.user);
        res.status(200).json(theRecord)
    } catch (err) {
        next(err)
    }
}

async function homeHandler(req, res, next) {
    try {
        const id = req.users.userId
        const theRecord = await newUserCOll.Feeds(id, newPostCOll.model);
        res.status(200).json(theRecord)
    } catch (err) {
        next(err)
    }
}

async function unFollowHandler(req, res, next) {
    try {

        // if the following id is exists in the body thats mean the user is in their following table and need to delete a folllowing id
        const following_id = req.body.following_id

        // if the followers id is exists in the body thats mean the user is in their followers table and need to delete a followers id
        const followers_id = req.body.followers_id

        // taking the user id which is the same (followers)from the token 
        const id = req.users.userId;

        // check if the user is in the following table so excute this code 
        if (following_id) {
            const followRecord = await modules.Followers.findOne({
                where: {
                    following_id: following_id,
                    me_id: id
                }
            });
            await followRecord.destroy();
            res.status(204).json(`following deleted`)

            // check if the user is in the followers table so excute this code 
        } else if (followers_id) {
            const followRecord = await modules.Followers.findOne({
                where: {
                    following_id: id,
                    me_id: followers_id

                }

            });
            await followRecord.destroy();
            res.status(204).json(`followers deleted`)
        }
    } catch (err) {
        next(err);
    }
}

module.exports = followRoute;

// another correct way if needed in front end this way is from the headers to delete a followers or following
// const followingId = req.params.following_id;
// find the record
// const followRecord = await data.Followers.findOne({
//     where: {
//         following_id: following_id,
//         me_id: id
//     }
// });

// if (!followRecord) {
//     return res.status(404).json({ message: 'Follower not found.' });
// } else {
//     // delete the record
//     await followRecord.destroy();

//     res.status(200).json({
//         message: 'Follower removed successfully.'
//     });
// }