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
            createNotificationRecord(postOwner.id, commentOwner.id, message);
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
            console.log("++++++++++++++++++++++++++++++++++")
            const message = `${followersOwner.username} followed you`;
            console.log(await createNotificationRecord(followingOwner.id, followersOwner.id,  message));
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
        followingPostOwner.map(ele => {
            let message = `${postOwner.username} added new photo`;
            createNotificationRecord(ele.me_id, postOwner.id, message);
        });
        res.status(201).json(respons);
    } catch (err) {
        next(err)
    }
}


async function handlelikes(req, res, next) {
    try {
        const record = req.body;
        const mod = modules.likeCollection;
        const respons = await mod.create(record);
        const likesOwner = await modules.user.findByPk(respons.dataValues.userid);
        // Post Owner
        const postOwner = await modules.user.findByPk(respons.dataValues.postid); // Assuming the user with ID "like.postid" exists

        console.log(postOwner.id);
        if (respons) {
            const message = `${likesOwner.username} liked your post`;
            createNotificationRecord(postOwner.id, likesOwner.id, message);
        }
        res.status(201).json(respons);
    } catch (err) {
        next(err)
    }
}


async function createNotificationRecord(ownerid, senderId, message) {
    await modules.notificationCollection.create({
        message: message,
        senderId: senderId,
        receiverId: ownerid
    })
    return "Create Data sucsufully";
}






module.exports = { handleComment, handleFollowing, handlePost, handlelikes };



