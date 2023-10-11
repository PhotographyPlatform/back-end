'use strict'

const { newUserCOll, post, user } = require("../../models")

module.exports = async (req, res, next) => {
    const id = req.params.id
    if (id) {
        console.log(id);
        const getUser = await newUserCOll.getRelation(id, post)
        const followers = await newUserCOll.followers(id, user)
        const following = await newUserCOll.following(id, user)
        req.data = {
            getUser: getUser,
            followers: followers,
            following: following
        }
        next()
    } else next('something went wrong')

}