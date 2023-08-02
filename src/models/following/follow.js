
const followModel = (newSequlize , DataTypes) => newSequlize.define('follow' , {
          followid:{
               type : DataTypes.INT,
               uniqe : true
          },
          userid:{
               type : DataTypes.INT
          }
     })
     



module.exports = followModel