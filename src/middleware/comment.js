const modules = require('../models')

async function handleComment(req, res, next) {
    try {
        const record = req.body;
        const mod = modules.newCOmCOll
        const respons = await mod.create(record);
        const commentOwner = await modules.user.findByPk(respons.dataValues.userid);
        // Post Owner
        const postOwner = await modules.user.findByPk(respons.dataValues.postid); // Assuming the user with ID "like.postid" exists
        
        console.log(postOwner.id);
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
        createNotificationRecord(postOwner.id ,message);

        }
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

module.exports = {
    handleComment,
    handlelikes
};
