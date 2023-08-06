
const R_Ph_Likes_Model = (newSequlize , DataTypes) => newSequlize.define('R_Ph_Likes' , {
     postid:{
          type : DataTypes.INTEGER,
          uniqe : true
     },
     userid:{
          type: DataTypes.INTEGER,
          uniqe : true
     }
})




module.exports = R_Ph_Likes_Model;