'use strict'
const base = require('base-64')
const bcrypt = require('bcrypt')
const { newUserCOll, newSequlize, DataTypes } = require('../../../models')
const userModel = require('../user.model')

let user = userModel(newSequlize , DataTypes)

module.exports =async (req ,res , next) =>{
     if(req.headers.authorization){
          const header = req.headers.authorization.split(' ').pop()
          const decode = base.decode(header)
          const [username , password] = decode.split(":")
          
          const validUser = await user.findOne({where :{username : username}})
          if(validUser !== null){
               const validPass = await bcrypt.compare(password , validUser.password)
               if(validPass){
                    req.user = validUser
                    next()
               }else{
                    next('invalid pass')
               }
          }
          else{
               next('user not exist')
          }
     }
     else{
          next('please enter the full data')
     }
     
}