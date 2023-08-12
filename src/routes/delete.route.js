'use strict'
const express = require('express')
const deleteRouter = express.Router()
const isAuth = require('../auth/middleWare/bearer')
const data = require('../models/')

// handle unlike by auth
deleteRouter.delete('/likes', isAuth, handleLikes)

//handle delete comment by auth
deleteRouter.delete('/comment', isAuth, handleComment)

// handle delete post by auth
deleteRouter.delete('/post', isAuth, handlePost)

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
    const id = req.users.userId
    const body = req.body
    const commentid = body.commentid
    if (body.postid) {
        const comments = await data.comment.findOne({ where: { postid: body.postid, userid: id, id: commentid } })
        if (comments) {
            await comments.destroy()
            res.status(204).json('deleted comment')
        } else res.status(500).json('you did not comment in this post')
    } else res.status(204).json('postid cannot be null')
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