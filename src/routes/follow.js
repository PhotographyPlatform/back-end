const express = require('express')
const modules = require('../models/index')
const { newPostCOll, newUserCOll } = require("../models")
const followRoute = express.Router()

followRoute.get('/Followers/:id', Followers)
followRoute.get('/Following/:id', following)
followRoute.get('/home/:id', homeHandler)

async function Followers(req, res) {
    try {
        const id = req.params.id;
        const theRecord = await newUserCOll.followers(id, modules.user);
        res.status(200).json(theRecord)
    } catch (err) {
        next(err)
    }
}

async function following(req, res) {
    try {
        const id = req.params.id;
        const theRecord = await newUserCOll.following(id, modules.user);
        res.status(200).json(theRecord)
    } catch (err) {
        next(err)
    }
}

async function homeHandler(req, res) {
    try {
        const id = req.params.id;
        const theRecord = await newUserCOll.Feeds(id, newPostCOll.model);
        res.status(200).json(theRecord)
    } catch (err) {
        next(err)
    }
}

module.exports = followRoute;