const express = require('express')
const multerRoute = express.Router()
const multer = require('multer')
const cloudinary = require('cloudinary') 
const path = require('path')
const { newPostCOll, StoriesColl } = require('../../models')
let imgUrl = null
let storyUrl = null

cloudinary.config({ 
     cloud_name: 'dtifuw6hd', 
     api_key: '465678975526394', 
     api_secret: 'sY3-x3b5tAHIpfuqwdKjbBjkXoU' 
   });

// cloudinary.config({ 
//      cloud_name: 'dtugtsfbg', 
//      api_key: '264412395898612', 
//      api_secret: 'UyCiUsZvVZudx4WnW8husv4TAXE' 
//    });

const storage = multer.diskStorage({
filename: function (req,file,cb) {
     
     cb(null, file.originalname)


}
});

const storageStory = multer.diskStorage({
     filename: function (req,file,cb) {
          
          cb(null, file.originalname)
     }
});



function checkFileType(file, cb){
     // Allowed ext
     const filetypes = /jpeg|jpg|png|gif/;
     // Check ext
     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
     // Check mime
     const mimetype = filetypes.test(file.mimetype);
   
     if(mimetype && extname){
       return cb(null,true);
     }else {
       cb('Error: Images Only!');
     }
}

// const uploadImg = multer({storage : storage}).single('image')


const upload = multer({storage : storage,
     limits:{fileSize: 100000000},
     fileFilter: function(req, file, cb){
       checkFileType(file, cb);
     }
})



// create post 

// need to fix to be in one handler not only one because one it's gonna overwrite the data 

multerRoute.post('/uploadPost',upload.single('image') ,  (req , res) =>{

     cloudinary.uploader.upload(req.file.path, function ( result){

          imgUrl = result.secure_url
          console.log(imgUrl);
          res.status(200).json({
            success: true,
            message:"Uploaded!",
            data: result.secure_url
          })
     })
})

multerRoute.post('/createMainPost' ,handleCreatePost )

async function handleCreatePost(req, res, next) {
     try {
         const obj = req.body;
         obj.imgurl = imgUrl
         const data = await newPostCOll.create(obj);
          imgUrl = null
         res.status(201).json({
             data
         });
     } catch (err) {
         next(err);
     }
 }

// create story 

const storyUpload = multer({storage : storageStory,
     limits:{fileSize: 100000000},
     fileFilter: function(req, file, cb){
       checkFileType(file, cb);
     }
})


multerRoute.post('/uploadStory',storyUpload.single('image') ,  (req , res) =>{

     cloudinary.uploader.upload(req.file.path, function ( result){

          storyUrl = result.secure_url

          console.log(result , '================================');
          console.log(imgUrl);
          res.status(200).json({
            success: true,
            message:"Uploaded!",
            data: result.secure_url
          })
     })
})

multerRoute.post('/createStory' ,handleCreateStory )

async function handleCreateStory(req, res, next) {
     try {
         const obj = req.body;
         obj.storyUrl = storyUrl
         console.log(obj);
         const data = await StoriesColl.create(obj);
         storyUrl = null
         res.status(201).json({
             data
         });
     } catch (err) {
         next(err);
     }
 }


// multerRoute.post('/createStory' ,handleCreateStory )

// async function handleCreateStory(req, res, next) {
//      try {
//          const obj = req.body;
//          obj.storyUrl = imgUrl
//          console.log(obj);
//          const data = await StoriesColl.create(obj);
//          imgUrl = null
//          res.status(201).json({
//              data
//          });
//      } catch (err) {
//          next(err);
//      }
//  }


//  multerRoute.get('/story', isAuth, story, (req, res) => res.status(200).json(req.data))





module.exports = multerRoute