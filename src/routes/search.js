const express = require('express')
const { newUserCOll, newPostCOll } = require('../models')
const searchRoute = express.Router()

//we search will be based on 2 things: users, posts :
// users -> search the user's names based on the search word
// posts -> search the post's title

searchRoute.post('/search', async (req, res, next) => {
     try {

     const searchWord = req.body.searchWord;

     //users
     const usersRecord = await newUserCOll.get();

     const usersResults = usersRecord.filter(user => user.username.toLowerCase().includes(searchWord.toLowerCase()));


     //posts
     const postsRecord = await newPostCOll.get();

     const postsResults = postsRecord.filter(post => post.title.toLowerCase().includes(searchWord.toLowerCase()));


     const searchResults = {
          users : usersResults,
          posts : postsResults
     }

     res.status(200).json(searchResults)
  
     } catch (err) {
          next(err)
     }
})


module.exports = searchRoute;
