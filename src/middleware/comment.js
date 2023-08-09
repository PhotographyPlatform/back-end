const { where } = require('sequelize');
const modules = require('../models')

async function handleComment(req, res, next) {
    try {
        const record = req.body;
        const model = modules.newCOmCOll
        const respons = await model.create(record);
        const commentOwner = await modules.user.findByPk(respons.dataValues.userid);
        const postOwner = await modules.user.findByPk(respons.dataValues.postid); // Assuming the user with ID "like.postid" exists
        if (respons) {
            const message = `${commentOwner.username} Add comment on your post`;
            reateNotificationRecord(postOwner.id, message);
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
        const followingOwner = await modules.user.findByPk(respons.dataValues.following_id);
        const followersOwner = await modules.user.findByPk(respons.dataValues.me_id);
        if (respons) {
            const message = `${followersOwner.username} followed you`;
            createNotificationRecord(followingOwner.id, message)
        }
        res.status(201).json(respons);
    } catch (err) {
        next(err)
    }
}

async function handlePost(req, res, next) {
    try {
    const record = req.body;
    const respons = await modules.newPostCOll.create(record);
    const postOwner = await modules.user.findByPk(respons.dataValues.userid);
    const followingPostOwner = await modules.Followers.findAll({ where: { following_id: postOwner.dataValues.id } });
    console.log("++++++++++++++++++++++++++++++++++++++++++")
    followingPostOwner.map(ele => {
        let message = `${postOwner.username} added new photo`;
        console.log(ele.me_id)
        createNotificationRecord(ele.me_id, message)
    });
    res.status(201).json(respons); 
    } catch (err) {
        next(err)
    }
}

async function createNotificationRecord(ownerid, message) {
    await modules.notificationCollection.create({
        message: message,
        userid: ownerid
    })
}






module.exports = { handleComment, handleFollowing, handlePost };