
const R_PH_Post_Model = (newSequlize , DataTypes) => newSequlize.define('reqphPost' , {
          imgurl:{
               type : DataTypes.STRING,
          },
          userid :{
               type : DataTypes.INTEGER,
               allowNull : false
          },
          title:{
               type : DataTypes.STRING
          },
          content:{
               type : DataTypes.STRING,
          }
     })
     

module.exports = R_PH_Post_Model