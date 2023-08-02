'use strict'

const { Sequelize, DataTypes  } = require('sequelize');
const Collection = require('./data-collections');
const commentModel = require('./comments/comment');
const postModel = require('./post/post');
const userModel = require('../auth/models/user.model')

require('dotenv').config();

const DB = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL

const newSequlize = new Sequelize(DB, {})


const newCOmCOll = new Collection(commentModel(newSequlize , DataTypes))
const newPostCOll = new Collection(postModel(newSequlize , DataTypes))
const newUserCOll = new Collection(userModel(newSequlize , DataTypes))





module.exports = {
     newSequlize ,
     DataTypes,
     newCOmCOll,
     newPostCOll,
     newUserCOll
     }  