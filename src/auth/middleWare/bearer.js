const jwt = require('jsonwebtoken')
const { newSequlize, DataTypes, newUserCOll } = require('../../models')
const userModel = require("../models/user.model")
let user = userModel(newSequlize, DataTypes)

module.exports = async (req, res, next) => {
     try {
          const header = req.headers.authorization.split(" ").pop()
          const validBearer = jwt.verify(header, process.env.SECRET)
          const getUser = await newUserCOll.get(validBearer.id)
          if (getUser) {
               req.users = validBearer
               next()
          } else {
               next('invalid token')
          }
     } catch (err) {
          next(err)
     }
}