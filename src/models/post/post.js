const { newSequlize, DataTypes } = require("..")

const postModel = (newSequlize , DataTypes) => newSequlize.define('posts' , {
          imgurl:{
               type : DataTypes.STRING,
               allowNull : false
          },
          userid :{
               type : DataTypes.INTEGER
          },
          title:{
               type : DataTypes.STRING
          },
          contant:{
               type : DataTypes.STRING
          },
          category :{
               type : DataTypes.ENUM('animal')
          }
     })
     

module.exports = postModel