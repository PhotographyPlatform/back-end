const { newSequlize , DataTypes} = require("..")



const commentModel = (newSequlize , DataTypes) => {

     newSequlize.define('comments' , {
          contant : {
               type : DataTypes.STRING,
               allowNull : false
          },
          userid :{
               type : DataTypes.STRING
          },
          Postid:{
               type : DataTypes.STRING
          }
     })
}


module.exports = commentModel