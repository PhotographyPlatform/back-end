'use strict'

const { Sequelize } = require('sequelize');

require('dotenv').config();

const DB = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL

const sequlize = new Sequelize(DB, {})

module.exports = sequlize