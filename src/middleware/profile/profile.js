'use strict'

const { newUserCOll } = require("../../models")

module.exports = async (req, res, next) => {
    const users = req.users
    if (users) {
        const id = users.userId
        console.log(id);
        const getUser = await newUserCOll.get(id)
        req.data = getUser
        next()
    } else next('something went wrong')

}