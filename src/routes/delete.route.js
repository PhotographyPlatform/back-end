'use strict'
const express = require('express')
const deleteRouter = express.Router()
const isAuth = require('../auth/middleWare/bearer')
const data = require('../models/')

// handle unlike 
deleteRouter.delete('/likes', isAuth, handleLikes)

//handle delete comment
deleteRouter.delete('/comment', isAuth, handleComment)

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

module.exports = deleteRouter