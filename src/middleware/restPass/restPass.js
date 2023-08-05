'use strict'

const { newUserCOll } = require("../../models");

module.exports = async (req, res, next) => {
    try {
        const body = req.body
        const email = body.email;
        const user = await newUserCOll.getEmail(email)
        if (user) {
            req.users = user
            next()
        }
        else next('email is not found')
    } catch (e) {
        next(e)
    }
}