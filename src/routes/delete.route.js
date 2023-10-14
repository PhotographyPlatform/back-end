'use strict'
const express = require('express')
const deleteRouter = express.Router()
const isAuth = require('../auth/middleWare/bearer')
const data = require('../models/')
const { Op } = require('sequelize');
// handle unlike by auth
deleteRouter.post('/likes', isAuth, handleLikes)

//handle delete comment by auth
deleteRouter.post('/comment', isAuth, handleComment)

// handle delete post by auth
deleteRouter.post('/post', isAuth, handlePost)

async function handleLikes(req, res) {
    const id = req.users.userId
    const body = req.body
    if (body.postid) {
        const likes = await data.like.findOne({ where: { postid: body.postid, userid: id } })
        if (likes) {
            await likes.destroy()
            res.status(204).json("unlike")
        } else res.status(500).json('you did not like this post')
    } else res.status(204).json('postid cannot be null')
}

async function handleComment(req, res) {
    const id = req.users.userId;
    const body = req.body;
    const commentid = body.commentid;

    if (commentid) {
        const comments = await data.comment.findOne({
            where: {
                userid: id,
                id: commentid
            }
        });

        if (comments) {
            await comments.destroy();
            res.status(204).json('Comment deleted successfully');
        } else {
            res.status(404).json('Comment not found');
        }
    } else {
        res.status(400).json('commentid must be provided');
    }
}


async function handlePost(req, res) {
    const id = req.users.userId
    const body = req.body
    const postid = body.postid
    if (postid) {
        const posts = await data.post.findOne({ where: { id: body.postid, userid: id } })
        if (posts) {
            await posts.destroy()
            res.status(204).json('post deleted')
        } else res.status(500).json('there is no post with this id')
    } else res.status(204).json('postid cannot be null')
}

module.exports = deleteRouter