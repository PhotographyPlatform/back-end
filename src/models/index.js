'use strict'
const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./data-collections');
const commentModel = require('./comments/comment');
const postModel = require('./post/post');
const userModel = require('../auth/models/user.model')
const likeModel = require('../models/likes/like');
const chatModel = require('./message/message');
const FollowersModel = require('./followers/follower')
const bioModel = require('./bio');
require('dotenv').config();



const DB = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL
const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
     dialectOptions: {
          ssl: {
               require: true,
               rejectUnauthorized: false,
          }
     }
} : {};


const newSequlize = new Sequelize(DB, DATABASE_CONFIG)
const user = userModel(newSequlize, DataTypes);
const post = postModel(newSequlize, DataTypes)
const comment = commentModel(newSequlize, DataTypes);
const like = likeModel(newSequlize, DataTypes);
const chat = chatModel(newSequlize, DataTypes)
const Followers = FollowersModel(newSequlize, DataTypes)
const bio = bioModel(newSequlize, DataTypes)



// Relationship 
// |user| one to many |post|   
user.hasMany(post, { foreignKey: 'userid', sourceKey: 'id' })
post.belongsTo(user, { foreignKey: 'userid', targetKey: 'id' })
// |user| one to many |comment| 
user.hasMany(comment, { foreignKey: 'userid', sourceKey: 'id' })
comment.belongsTo(user, { foreignKey: 'userid', targetKey: 'id' })
// // |post| one to many |comment| 
post.hasMany(comment, { foreignKey: 'postid', sourceKey: 'id' })
comment.belongsTo(post, { foreignKey: 'postid', targetKey: 'id' })
// // |post| one to many |like| 
post.hasMany(like, { foreignKey: 'postid', targetKey: 'id' })
like.belongsTo(post, { foreignKey: 'postid', targetKey: 'id' })
// // |user| one to many |like| 
user.hasMany(like, { foreignKey: 'userid', sourceKey: 'id' })
like.belongsTo(user, { foreignKey: 'userid', targetKey: 'id' })

// ------------------------------------------------------------------------------------
// A user can send multiple messages (one-to-many relationship)
user.hasMany(chat, { foreignKey: 'senderId', as: 'sentMessages' });
user.hasMany(chat, { foreignKey: 'receiverId', as: 'receivedMessages' });


// Each message belongs to a sender (one-to-one relationship)
chat.belongsTo(user, { foreignKey: 'senderId', as: 'sender' });
chat.belongsTo(user, { foreignKey: 'receiverId', as: 'receiver' });

// |user| one to one  |bio|
user.hasOne(bio, { foreignKey: 'userid', targetKey: 'id' });
bio.belongsTo(user, { foreignKey: 'userid', targetKey: 'id' });



// Followo Relations
user.belongsToMany(user, {
     as: 'Followers',
     through: Followers,
     foreignKey: 'following_id',
     otherKey: 'me_id'
});

user.belongsToMany(user, {
     as: 'Following',
     through: Followers,
     foreignKey: 'me_id',
     otherKey: 'following_id'
});

Followers.belongsTo(user, { foreignKey: 'following_id', as: 'FollowerUser' });
Followers.belongsTo(user, { foreignKey: 'me_id', as: 'FollowedUser' });


const newCOmCOll = new Collection(comment)
const newPostCOll = new Collection(post)
const newUserCOll = new Collection(user)
const likeCollection = new Collection(like)
const chatCollection = new Collection(chat)
const FollowersColl = new Collection(Followers)
const bioCollection = new Collection(bio)
module.exports = {
     post,
     like,
     comment,
     newSequlize,
     DataTypes,
     newCOmCOll,
     newPostCOll,
     newUserCOll,
     likeCollection,
     chatCollection,
     FollowersColl,
     Followers,
     user,
     bioCollection,
     bio
}  