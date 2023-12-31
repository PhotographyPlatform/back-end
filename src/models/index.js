"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const Collection = require("./data-collections");

const commentModel = require("./comments/comment");
const postModel = require("./post/post");
const userModel = require("../auth/models/user.model");
const likeModel = require("../models/likes/like");
const chatModel = require("./message/message");
const FollowersModel = require("./followers/follower");
const R_PH_Post_Model = require("./reqPhotographerPost/R_Ph_Post");
const req_ph_comments = require("./reqPhotographerPost/R_Ph_comment");
const R_Ph_Likes_Model = require("./reqPhotographerPost/R_Ph_Likes");
const favoritesModel = require("./favorites/favorites");
const reportModel = require("./report");
const categoriesModel = require("./categories");

// const FollowersModel = require('./followers/follower')
const notificationModel = require("./notifications");
const bioModel = require("./bio");
const storyModel = require("./stories/story");
const challenage = require("./challenage/challenage");
const reply = require("./reply/reply");
require("dotenv").config();

const DB =
  process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG =
  process.env.NODE_ENV === "production"
    ? {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }
    : {};

const newSequlize = new Sequelize(DB, DATABASE_CONFIG);
const user = userModel(newSequlize, DataTypes);
const post = postModel(newSequlize, DataTypes);
const comment = commentModel(newSequlize, DataTypes);
const like = likeModel(newSequlize, DataTypes);
const chat = chatModel(newSequlize, DataTypes);
const Followers = FollowersModel(newSequlize, DataTypes);
const R_PH_Post = R_PH_Post_Model(newSequlize, DataTypes);
const req_ph_comment = req_ph_comments(newSequlize, DataTypes);
const R_Ph_Likes = R_Ph_Likes_Model(newSequlize, DataTypes);
const bio = bioModel(newSequlize, DataTypes);
const stories = storyModel(newSequlize, DataTypes);
const notification = notificationModel(newSequlize, DataTypes);
const favorites = favoritesModel(newSequlize, DataTypes);
const challenages = challenage(newSequlize, DataTypes);
const replys = reply(newSequlize, DataTypes);
const report = reportModel(newSequlize, DataTypes);
const categories = categoriesModel(newSequlize, DataTypes)


// Relationship | user | likes | comments

// |user| one to many |post|
user.hasMany(post, { foreignKey: "userid", sourceKey: "id" });
post.belongsTo(user, { foreignKey: "userid", targetKey: "id" });
// |user| one to many |comment|
user.hasMany(comment, { foreignKey: "userid", sourceKey: "id" });
comment.belongsTo(user, { foreignKey: "userid", targetKey: "id" });
// // |post| one to many |comment|
post.hasMany(comment, { foreignKey: "postid", sourceKey: "id" });
comment.belongsTo(post, { foreignKey: "postid", targetKey: "id" });
// // |post| one to many |like|
post.hasMany(like, { foreignKey: "postid", targetKey: "id" });
like.belongsTo(post, { foreignKey: "postid", targetKey: "id" });
// // |user| one to many |like|
user.hasMany(like, { foreignKey: "userid", sourceKey: "id" });
like.belongsTo(user, { foreignKey: "userid", targetKey: "id" });

// ------------------------------------------------------------------------------------
// Relationship | User | Story

// user one to many to stories
user.hasMany(stories, { foreignKey: "userid", sourceKey: "id" });
stories.belongsTo(user, { foreignKey: "userid", targetKey: "id" });
// stories one to many to likes
stories.hasMany(like, { foreignKey: "storyID", sourceKey: "id" });
like.belongsTo(stories, { foreignKey: "storyID", targetKey: "id" });
// ------------------------------------------------------------------------------------
// Relationship | User | Chat

// A user can send multiple messages (one-to-many relationship)
user.hasMany(chat, { foreignKey: "senderId", as: "sentMessages" });
user.hasMany(chat, { foreignKey: "receiverId", as: "receivedMessages" });

// Each message belongs to a sender (one-to-one relationship)
chat.belongsTo(user, { foreignKey: "senderId", as: "sender" });
chat.belongsTo(user, { foreignKey: "receiverId", as: "receiver" });

// ------------------------------------------------------------------------------------

// |user| one to one  |bio|
user.hasOne(bio, { foreignKey: "userid", targetKey: "id" });
bio.belongsTo(user, { foreignKey: "userid", targetKey: "id" });

// A user can send multiple report (one-to-many relationship)
user.hasMany(report, { foreignKey: "userId", sourceKey: "id" });
report.belongsTo(user, { foreignKey: "userId", targetKey: "id" });

// ------------------------------------------------------------------------------------
// Follwo Relations

user.belongsToMany(user, {
  as: "Followers",
  through: Followers,
  foreignKey: "following_id",
  otherKey: "me_id",
});

user.belongsToMany(user, {
  as: "Following",
  through: Followers,
  foreignKey: "me_id",
  otherKey: "following_id",
});

Followers.belongsTo(user, { foreignKey: "following_id", as: "FollowerUser" });
Followers.belongsTo(user, { foreignKey: "me_id", as: "FollowedUser" });

// ------------------------------------------------------------------------------------
// Request Photographer Relations

// request photographer user // post Relations
user.hasMany(R_PH_Post, { foreignKey: "userid", sourceKey: "id" });
R_PH_Post.belongsTo(user, { foreignKey: "userid", targetKey: "id" });

// request photographer post // comment Relations
user.hasMany(req_ph_comment, { foreignKey: "userid", sourceKey: "id" });
req_ph_comment.belongsTo(user, { foreignKey: "userid", targetKey: "id" });

// // |post| one to many |comments|
R_PH_Post.hasMany(req_ph_comment, { foreignKey: "postid", sourceKey: "id" });
req_ph_comment.belongsTo(R_PH_Post, { foreignKey: "postid", targetKey: "id" });

// // |post| one to many |Likes|
R_PH_Post.hasMany(R_Ph_Likes, { foreignKey: "postid", sourceKey: "id" });
R_Ph_Likes.belongsTo(R_PH_Post, { foreignKey: "postid", targetKey: "id" });

// // |user| one to many |likes|
user.hasMany(R_Ph_Likes, { foreignKey: "userid", sourceKey: "id" });
R_Ph_Likes.belongsTo(user, { foreignKey: "userid", targetKey: "id" });

//|user|one to many |Notification|
user.hasMany(notification, { foreignKey: "receiverId", sourceKey: "id" });
notification.belongsTo(user, { foreignKey: "receiverId", targetKey: "id" });
// ------------------------------------------------------------------------------------
// // challenage relations

challenages.hasMany(post, { foreignKey: "challengeID", sourceKey: "id" });
post.belongsTo(challenages, { foreignKey: "challengeID", targetKey: "id" });

// ------------------------------------------------------------------------------------
// // replies relations

comment.hasMany(replys, { foreignKey: "commentid", sourceKey: "id" });
replys.belongsTo(comment, { foreignKey: "commentid", targetKey: "id" });

user.hasMany(replys, { foreignKey: "userid", sourceKey: "id" });
replys.belongsTo(user, { foreignKey: "userid", targetKey: "id" });

const newCOmCOll = new Collection(comment);
const newPostCOll = new Collection(post);
const newUserCOll = new Collection(user);
const likeCollection = new Collection(like);
const chatCollection = new Collection(chat);
const FollowersColl = new Collection(Followers);
const R_PH_PostColl = new Collection(R_PH_Post);
const req_ph_commentsColl = new Collection(req_ph_comment);
const R_Ph_LikesColl = new Collection(R_Ph_Likes);
const bioCollection = new Collection(bio);
const StoriesColl = new Collection(stories);
const notificationCollection = new Collection(notification);
const favoritesCollection = new Collection(favorites);
const challenagesCollection = new Collection(challenages);
const replysCollection = new Collection(replys);
const reportCollection = new Collection(report);
const categoriesCollection = new Collection(categories)


module.exports = {
  newSequlize,
  post,
  like,
  comment,
  DataTypes,
  newCOmCOll,
  newPostCOll,
  newUserCOll,
  likeCollection,
  chatCollection,
  FollowersColl,
  Followers,
  user,
  R_PH_PostColl,
  R_PH_Post,
  req_ph_commentsColl,
  req_ph_comment,
  R_Ph_LikesColl,
  R_Ph_Likes,
  bioCollection,
  bio,
  StoriesColl,
  stories,
  notificationCollection,
  notification,
  favorites,
  favoritesCollection,
  challenagesCollection,
  challenages,
  replys,
  replysCollection,
  reportModel,
  report,
  reportCollection,
  categories,
  categoriesCollection,
  chat

};
