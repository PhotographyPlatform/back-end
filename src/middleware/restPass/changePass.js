'use strict'

const { newUserCOll } = require("../../models");
const jwt = require('jsonwebtoken')
const secert = process.env.SECRET

module.exports = async (req, res, next) => {
    const body = req.body;
    const newPass = body.newPassword;
    const confirm = body.confirmPass;
    if (newPass === confirm) {
        const id = req.params.id
        const token = await jwt.verify(id, secert)
        const user = await newUserCOll.get(token)
        if (user) {
            await user.update({ password: newPass });
            console.log('Password updated successfully.');
            next();
        } else next('user not found')
    }
    else next('both password must match')
}