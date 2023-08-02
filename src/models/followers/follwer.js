const { newSequlize, DataTypes } = require("..")




const followerModel = (newSequlize , DataTypes) => newSequlize.define('follower' , {
          followerid:{
               type : DataTypes.INT,
               uniqe : true
          },
          userid:{
               type : DataTypes.INT
          }
     })
     



module.exports = followerModel