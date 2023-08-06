const middleware = require('../../middleware/basicRoutes');
const express = require('express')
const modules = require('../../models')
const postPageRoute = express.Router()


// create post request 
postPageRoute.post('/requestphotogrpher/R_PH_PostColl/:userid' , async (req , res) =>{
     const content = req.body.content
     const userid = req.params.userid

     const createPost = await modules.R_PH_PostColl.create({userid: userid, content : content})

     res.status(201).json({
          message : `post created`,
          createPost
     })
})


//  add like or comments
postPageRoute.post('/requestphotogrpher/:model/:userid/:postid' , async (req , res) =>{
     const model = req.params.model
     const content = req.body.content
     const userid = req.params.userid
     const postid = req.params.postid

     const createPost = await modules[model].create({userid: userid, content : content, postid : postid})

     res.status(201).json({
          message : `create ${model}`,
          createPost
     })
})



// get post with it's likes and comments
postPageRoute.get('/requestphotogrpher/post/:id' , async (req , res) =>{
     const id = req.params.id
     const getPost = await modules.R_PH_PostColl.getManyRelation(id ,modules.req_ph_comment , modules.R_Ph_Likes)

     res.status(200).json({
          message : 'get post with its likes and comments',
          getPost
     })
})


// get All posts with it's likes and comments
postPageRoute.get('/requestphotogrpher/allpost' , async (req , res) =>{
     const getPost = await modules.R_PH_PostColl.getAllManyRelation(modules.req_ph_comment , modules.R_Ph_Likes)

     res.status(200).json({
          message : 'get all posts with its likes and comments',
          getPost
     })
})


// get posts from user
postPageRoute.get('/requestphotogrpher/:id' , async (req , res) =>{
     const id = req.params.id
     const getPost = await modules.newUserCOll.getRelation(id ,modules.R_PH_Post)

     res.status(200).json({
          message : 'get posts from user',
          getPost
     })
})






module.exports = postPageRoute