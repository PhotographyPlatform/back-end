const modules = require('../../models')


async function handleComment(req, res, next) {
    try {
        const record = req.body;
        record["userid"] = req.users.userId;
        const model = modules.newCOmCOll
        const respons = await model.create(record);
        const commentOwner = await modules.user.findByPk(respons.dataValues.userid);
        const postOwner = (await modules.post.findByPk(respons.dataValues.postid)).userid; // Assuming the user with ID "like.postid" exists

        if (respons) {
            const message = `${commentOwner.username} Add comment on your post`;
            createNotificationRecord(postOwner, commentOwner.id, message, respons.id, respons.dataValues.postid, 'comment');
        }
        res.status(201).json(respons);
    } catch (err) {
        next(err)
    }
}

async function handleFollowing(req, res, next) {
    try {
        const record = req.body;
        record["me_id"] = req.users.userId;
        if (record.following_id !== record.me_id) {
            const respons = await modules.FollowersColl.create(record);
            const followingOwner = await modules.user.findByPk(respons.dataValues.following_id);
            const followersOwner = await modules.user.findByPk(respons.dataValues.me_id);
            if (respons) {
                const message = `${followersOwner.username} followed you`;
                await createNotificationRecord(followingOwner.id, followersOwner.id, message, followersOwner.id, respons.dataValues.following_id, 'follow');
            }
            res.status(201).json(respons);
        } else res.status(400).json('you cant follow yourself')
    } catch (err) {
        next(err)
    }
}

async function handlePost(req, res, next) {
    try {
        let record = req.body;
        record.imgurl = req.image
        record["userid"] = req.users.userId;
        record.category = record.category.trim().toLowerCase().split(/\s*,\s*/);


        if (await handleCategory(record.category)) {
            const respons = await modules.newPostCOll.create(record);

            // handle Notifications 
            const postOwner = await modules.user.findByPk(respons.dataValues.userid);
            const followingPostOwner = await modules.Followers.findAll({ where: { following_id: postOwner.dataValues.id } });
            followingPostOwner.map(ele => {
                let message = `${postOwner.username} added new post`;
                createNotificationRecord(ele.me_id, postOwner.id, message, respons.id, respons.dataValues.id, 'post');
            });
            res.status(201).json(respons);

        } else {
            const respons = "Please write the category correctly"
            res.status(201).json(respons);
        }


    } catch (err) {
        next(err)
    }
}

async function handleCategory(array) {
    const categoriesData = await modules.categoriesCollection.get();
    const categoryNames = categoriesData.map(category => category.name);
    return array.every(item => categoryNames.includes(item));
}




async function handlelikes(req, res, next) {
    try {
        const record = req.body;
        record["userid"] = req.users.userId;
        const mod = modules.likeCollection;
        const validLike = await modules.like.findOne({ where: { postid: record.postid, userid: record.userid } })
        if (!validLike) {
            const respons = await mod.create(record);
            const likesOwner = await modules.user.findByPk(respons.dataValues.userid);
            // Post Owner
            const postOwner = (await modules.post.findByPk(respons.dataValues.postid)).userid; // Assuming the user with ID "like.postid" exists

            if (respons) {
                const message = `${likesOwner.username} liked your post`;
                createNotificationRecord(postOwner, likesOwner.id, message, respons.id, respons.dataValues.postid, 'like');
            }
            res.status(201).json(respons);
        } else {
            res.status(400).json('you already liked this post')
        }
    } catch (err) {
        next(err)
    }
}


async function createNotificationRecord(receiverId, senderId, message, actionId, actionParentId, actionType) {
    try {
        if (senderId === receiverId) return null;

        await modules.notificationCollection.create({
            message: message,
            actionId: actionId,
            senderId: senderId,
            receiverId: receiverId,
            actionParentId: actionParentId,
            actionType: actionType
        })
    } catch (err) {
        console.log('There is an error when creating a notification record:: ', err)
    }

    return "Create Data sucsufully";
}



async function createPost(record, userId) {
    try {
        record["userid"] = userId;
        const respons = await modules.newPostCOll.create(record);
        const postOwner = await modules.user.findByPk(respons.dataValues.userid);
        const followingPostOwner = await modules.Followers.findAll({ where: { following_id: postOwner.dataValues.id } });
        followingPostOwner.map(ele => {
            let message = `${postOwner.username} added new photo`;
            createNotificationRecord(ele.me_id, postOwner.id, message, respons.id);
        });
        return respons;
    } catch (err) {
        throw err;
    }
}

async function handlePostTest(req, res, next) {
    try {
        const record = req.body;
        const userId = req.users.userId;
        const respons = await createPost(record, userId);
        res.status(201).json(respons);
    } catch (err) {
        next(err);
    }
}
async function handleAdminMessage(req, res, next) {
    try {
        const message = req.body;

        modules.user
    } catch (err) {
        next(err);
    }
}


module.exports = { handleComment, handleFollowing, handlePost, handlelikes, handlePostTest, handleAdminMessage };



