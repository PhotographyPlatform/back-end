'use strict'

const { newUserCOll } = require("../../models");

module.exports = async (req, res, next) => {
    const body = req.body;
    const newPass = body.newPassword;
    const confirm = body.confirmPass;
    if (newPass === confirm) {
        const id = req.users.id
        const user = await newUserCOll.get(id)
        if (user) {
            await user.update({ password: newPass });
            console.log('Password updated successfully.');
            next();
        } else next('user not found')
    }
    else next('both password must match')
}