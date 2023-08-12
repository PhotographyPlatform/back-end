const { where } = require('sequelize');
const modules = require('../../models')

async function handleComment(req, res, next) {
    try {
        const record = req.body;
        const model = modules.newCOmCOll
        const respons = await model.create(record);
        const commentOwner = await modules.user.findByPk(respons.dataValues.userid);
        const postOwner = (await modules.post.findByPk(respons.dataValues.postid)).userid; // Assuming the user with ID "like.postid" exists

        if (respons) {

            const message = `${commentOwner.username} Add comment on your post`;
            createNotificationRecord(postOwner, commentOwner.id, message, respons.id);
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
            await createNotificationRecord(followingOwner.id, followersOwner.id, message, respons.id);
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
            console.log("-----------------------------------------")
            console.log("followingPostOwner------------------", ele.me_id)
            console.log("postOwner---------------------------", postOwner.id);
            let message = `${postOwner.username} added new photo`;
            createNotificationRecord(ele.me_id, postOwner.id, message, respons.id);
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
        const postOwner = (await modules.post.findByPk(respons.dataValues.postid)).userid; // Assuming the user with ID "like.postid" exists

        if (respons) {
            const message = `${likesOwner.username} liked your post`;
            createNotificationRecord(postOwner, likesOwner.id, message, respons.id);
        }
        res.status(201).json(respons);
    } catch (err) {
        next(err)
    }
}


async function createNotificationRecord(receiverId, senderId, message, actionId) {
    try {
        await modules.notificationCollection.create({
            message: message,
            actionId: actionId,
            senderId: senderId,
            receiverId: receiverId
        })
    } catch (err) {
        console.log('There is an error when creating a notification record:: ', err)
    }

    return "Create Data sucsufully";
}






module.exports = { handleComment, handleFollowing, handlePost, handlelikes };



