'use strict'

const express = require('express');
const FeedsClass = require('../models/feeds-collection');
const profileRoute = express.Router();
const modules = require("../models");
const isAuth = require('../auth/middleWare/bearer')
profileRoute.get("/profile", isAuth, handleProfile)
profileRoute.get("/profile/Bio", isAuth, handleBio)
profileRoute.get("/profile/userData", isAuth, handleUserBio)
profileRoute.get("/profile/userPost", isAuth, handleUserPost)
profileRoute.get("/profile/followers", isAuth, handleUserFollowers)
profileRoute.get("/profile/following", isAuth, handleUserFollowing)

profileRoute.get("/profile/home", isAuth, async (req, res, next) => {
    try {
        const id = req.users.userId;
        const Feeds = new FeedsClass(id);
        let record = await Feeds.getAllData();

        res.status(200).json(record);
    } catch (err) {
        next(err);
    }
});

async function handleBio(req, res, next) {
    try {
        const id = req.users.userId;
        const record = await modules.bioCollection.get(id);

        res.status(200).json(record);
    } catch (err) {
        next(err);
    }
}

async function handleProfile(req, res, next) {
    try {
        const id = req.users.userId;
        const user = await modules.newUserCOll.get(id);
        const record = await modules.newPostCOll.getUserPost(id);
        const bio = await modules.bioCollection.get(id);
        const followers = await handleFollowersData(id);
        const following = await handleFollowingData(id);
        if (bio !== null) {
            bio = bio.contant;
        }
        const profileData = {
            user,
            Bio: bio,
            Followers: followers,
            Following: following,
            UserPost: record,
        };
        res.status(200).json(profileData);
    } catch (err) {
        next(err);
    }
}


async function handleUserPost(req, res, next) {
    try {
        const id = req.users.userId;
        const record = await modules.newPostCOll.getUserPost(id)
        res.status(200).json(record);
    } catch (err) {
        next(err);
    }
}


async function handleUserBio(req, res, next) {
    try {
        const id = req.users.userId;
        const record = await modules.newUserCOll.getRelation(id, modules.bio)
        res.status(200).json(record)
    } catch (err) {
        next(err)
    }
}

async function handleUserFollowers(req, res, next) {
    try {
        const id = req.users.userId;
        let record = await handleFollowersData(id)
        console.log(record);
        res.status(200).json(record)
    } catch (err) {
        next(err)
    }
}

async function handleUserFollowing(req, res, next) {
    try {
        const id = req.users.userId
        // const id =1
        let record = await handleFollowingData(id)
        res.status(200).json(record)
    } catch (err) {
        next(err)
    }
}

async function handleFollowingData(id) {

    let record = await modules.newUserCOll.following(id, modules.user);
    return record;
}
async function handleFollowersData(id) {
    let record = await modules.newUserCOll.followers(id, modules.user);
    return record;
}




module.exports = profileRoute