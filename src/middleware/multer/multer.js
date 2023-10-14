const express = require("express");
const multerRoute = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary");
const path = require("path");

cloudinary.config({
  cloud_name: "dtifuw6hd",
  api_key: "465678975526394",
  api_secret: "sY3-x3b5tAHIpfuqwdKjbBjkXoU",
});

// cloudinary.config({
//      cloud_name: 'dtugtsfbg',
//      api_key: '264412395898612',
//      api_secret: 'UyCiUsZvVZudx4WnW8husv4TAXE'
//    });

const storageProfile = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const storageStory = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const profileUpload = multer({
  storage: storageProfile,
  limits: { fileSize: 100000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

const storyUpload = multer({
  storage: storageStory,
  limits: { fileSize: 100000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

function uploadStory(req, res, next) {
  try {
    cloudinary.uploader.upload(req.file.path, function (result) {
      console.log(result.secure_url);
      req.image = result.secure_url;
      next();
    });
  } catch (err) {
    next(err);
  }
}

async function uploadProfile(req, res, next) {
  try {
    cloudinary.uploader.upload(req.file.path, function (result) {
      console.log(result.secure_url);
      req.image = result.secure_url;
      next();
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  multerRoute,
  uploadProfile,
  profileUpload,
  uploadStory,
  storyUpload,
};
