
const followerModel = (newSequlize, DataTypes) => newSequlize.define('followers', {
     following_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
               model: 'users',
               key: 'userid'
          }
     },
     me_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
               model: 'users',
               key: 'userid'
          }
     }
});


module.exports = followerModel