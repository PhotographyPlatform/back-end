'use strict'
const data = require('../models/index')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization.split(" ").pop()
    const decode = jwt.decode(token)
    const feed = await data.newUserCOll.Feeds(decode.userId, data.post)
    res.status(200).json(feed)
    next();
}