'use strict'

const { newUserCOll } = require("../../models");

module.exports = async (req, res, next) => {
    try {
        const obj = req.body
        const id = req.params.id
        const user = await newUserCOll.get(id)
        if (user) {
            await user.update({ password: obj.newPassword });
            console.log('Password updated successfully.');
            next();
        } else next('user not found')
    } catch (e) {
        console.log(e.message);
    }
}
