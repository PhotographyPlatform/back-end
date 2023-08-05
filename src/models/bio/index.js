const bioModel = (newSequlize, DataTypes) =>
    newSequlize.define('bio', {
        contant: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userid: {
            type: DataTypes.INTEGER
        },
    })
module.exports = bioModel;