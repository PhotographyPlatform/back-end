'use strict'
const data = require('../models/index')
const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
    const decode = await jwt.decode(req.token)
    const id = decode.userId
    console.log('this is id', id);
    const record = await data.newUserCOll.getRelation(id, data.stories)
    const getData = [{ id: record.id, username: record.username, Stories: record.stories }]
    req.data = getData
    next()
}