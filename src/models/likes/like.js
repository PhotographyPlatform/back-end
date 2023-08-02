
const followerModel = (newSequlize , DataTypes) => newSequlize.define('follower' , {
          postid:{
               type : DataTypes.INT,
               uniqe : true
          },
          userid:{
               type : DataTypes.INT,
               uniqe : true
          }
     })
     



module.exports = followerModel