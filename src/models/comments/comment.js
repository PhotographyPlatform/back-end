const commentModel = (newSequlize , DataTypes) => 
     newSequlize.define('comments' , {
          contant : {
               type : DataTypes.STRING,
               allowNull : false
          },
          userid :{
               type : DataTypes.INTEGER
          },
          postid:{
               type: DataTypes.INTEGER
          }
     })
module.exports = commentModel