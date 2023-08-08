const modules = require('../models')

async function handleComment(req, res, next) {
    try {
        const record = req.body;
        const model = modules.newCOmCOll
        const respons = await model.create(record);
        const commentOwner = await modules.user.findByPk(respons.dataValues.userid);
        const postOwner = await modules.user.findByPk(respons.dataValues.postid); // Assuming the user with ID "like.postid" exists
        if (respons) {
            modules.notificationCollection.create({
                message: `${commentOwner.username} Add comment on your post`,
                userid: postOwner.id
            })
        }
        res.status(201).json(respons);

    } catch (err) {
        next(err)
    }
}

async function handleFollowing(req, res, next) {
    try {
        const record = req.body;
        const respons = await modules.FollowersColl.create(record);

        console.log(respons);

        const followingOwner = await modules.user.findByPk(respons.dataValues.following_id);
        const followersOwner = await modules.user.findByPk(respons.dataValues.me_id);

        if (respons) {
            modules.notificationCollection.create({
                message:`${followersOwner.username} followed you`,
                userid:followingOwner.id
            })
        }

        res.status(201).json(respons);
    } catch (err) {
        next(err)
    }
}







module.exports = { handleComment, handleFollowing };