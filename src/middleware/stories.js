'use strict'
const data = require('../models/index')
const jwt = require('jsonwebtoken')



module.exports = async (req, res, next) => {
    const id = req.users.userId
    const record = await data.newUserCOll.getRelation(id, data.stories)
    const getData = [{ id: record.id, username: record.username, Stories: record.stories }]
    req.data = getData
    next()
}