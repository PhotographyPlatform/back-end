'use strict'
const base = require('base-64')
const bcrypt = require('bcrypt')
const { newUserCOll, newSequlize, DataTypes } = require('../../models')
const userModel = require('../models/user.model')

let user = userModel(newSequlize, DataTypes)

module.exports = async (req, res, next) => {
     if (req.headers.authorization) {
          const header = req.headers.authorization.split(' ').pop()
          console.log(header);
          const decode = base.decode(header)
          console.log(decode);
          const [username, password] = decode.split(":")
          const validUser = await user.findOne({ where: { username: username } })
          if (validUser !== null) {
               const validPass = await bcrypt.compare(password, validUser.password)
               if (validPass) {
                    req.user = validUser
                    next()
               } else {
                    res.status(401).json('Invalid password');
               }
          }
          else {
               res.status(401).json('Invalid userName');
          }
     }
     else {
          res.status(401).json('please enter the full data');
     }
}
