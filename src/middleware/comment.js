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

module.exports = handleComment;