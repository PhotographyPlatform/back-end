const express = require('express');
const profileRoute = express.Router();
const modules = require("../models");
const { log } = require('console');
profileRoute.get("/profile/:userid", handleProfile)
profileRoute.get("/profile/Bio/:userid", handleBio)
profileRoute.get("/profile/userBio/:userid", handleUserBio)
profileRoute.get("/profile/userPost/:userid", handleUserPost)
profileRoute.get("/profile/followers/:userid", handleUserFollowers)
profileRoute.get("/profile/following/:userid", handleUserFollowing)


async function handleBio(req, res, next) {
    try {
        const id = req.params.userid;
        const record = await modules.bioCollection.get(id);
        res.status(200).json(record);
    } catch (err) {
        next(err);
    }
}

async function handleProfile(req, res, next) {
    try {
        const id = req.params.userid;
        const user = await modules.newUserCOll.get(id);
        const record = await modules.newPostCOll.getUserPost(id);
        const bio = await modules.bioCollection.get(id);
        const followers = await handleFollowersData(id);
        const following = await handleFollowingData(id);
        const profileData = {
            user,
            Bio: bio.contant,
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
        const id = req.params.userid;
        const record = await modules.newPostCOll.getUserPost(id)
        res.status(200).json(record);
    } catch (err) {
        next(err);
    }
}


async function handleUserBio(req, res, next) {
    try {
        const id = req.params.userid
        const record = await modules.newUserCOll.getRelation(id, modules.bio)
        res.status(200).json(record)
    } catch (err) {
        next(err)
    }
}

async function handleUserFollowers(req, res, next) {
    try {
        const id = req.params.userid;
        record = await handleFollowersData(id)
        res.status(200).json(record)
    } catch (err) {
        next(err)
    }
}

async function handleUserFollowing(req, res, next) {
    try {
        const id = req.params.userid;
        record = await handleFollowingData(id)
        res.status(200).json(record)
    } catch (err) {
        next(err)
    }
}

function handleFollowRecord(record) {
    record = record.reduce((acc, curr) => acc.concat(curr), []);
    record = record.reduce((acc, curr) => acc.concat(curr), []);
    return record;
}

async function handleFollowingData(id) {
    let record = await modules.newUserCOll.following(id, modules.user);
    record = record.map(ele => ele.Following)
    record = handleFollowRecord(record)
    return { record, count: record.length };
}
async function handleFollowersData(id) {
    let record = await modules.newUserCOll.followers(id, modules.user);
    record = record.map(ele => ele.followers)
    record = handleFollowRecord(record)
    return { record, count: record.length };
}




module.exports = profileRoute
