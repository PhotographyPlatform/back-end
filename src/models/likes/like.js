
const likeModel = (newSequlize , DataTypes) => newSequlize.define('like' , {
          postid:{
               type : DataTypes.INTEGER,
               uniqe : true
          },
          userid:{
               type: DataTypes.INTEGER,
               uniqe : true
          }
     })
     



module.exports = likeModel;