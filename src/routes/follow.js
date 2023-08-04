const express = require('express')
const modules = require('../models/index')
const { newPostCOll, newUserCOll} = require("../models")
const followRoute = express.Router()

followRoute.get('/Followers/:id', Followers)
followRoute.get('/Following/:id', following)
followRoute.get('/home/:id', homeHandler)

async function Followers(req, res) {
    const id = req.params.id;
    const theRecord = await newUserCOll.followers(id, modules.user);
    res.status(200).json(theRecord)
}

async function following(req, res) {
    const id = req.params.id;
    const theRecord = await newUserCOll.following(id, modules.user);
    res.status(200).json(theRecord)
}

async function homeHandler(req, res) {
    const id = req.params.id;
    const theRecord = await newUserCOll.Feeds(id, newPostCOll.model);
    res.status(200).json(theRecord)
}

module.exports = followRoute;