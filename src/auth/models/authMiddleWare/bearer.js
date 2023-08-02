const jwt = require ('jsonwebtoken')
const { newSequlize, DataTypes } = require('../../../models')
const userModel = require('../user.model')
let user = userModel(newSequlize , DataTypes)

module.exports = async(req , res , next) =>{
     const header = req.headers.authorization.split(" ").pop()
     const validBearer =  jwt.verify(header , process.env.SECRET)
     const getUser = await user.findOne({where :{username : validBearer.username}})
     if(getUser){
          req.token = header
          next()
     }else{
          next('invalid token')
     }

}