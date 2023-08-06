const req_ph_comments = (newSequlize , DataTypes) => 
     newSequlize.define('req_ph_comments' , {
          content : {
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
module.exports = req_ph_comments