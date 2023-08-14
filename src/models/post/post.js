const { newSequlize, DataTypes } = require("..");

const postModel = (newSequlize, DataTypes) =>
  newSequlize.define("posts", {
    imgurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    contant: {
      type: DataTypes.STRING,
    },
    challengeName: {
      type: DataTypes.STRING,
    },
    challengeID: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: process.env.NODE_ENV === 'test' ? DataTypes.STRING : DataTypes.ARRAY(DataTypes.STRING)
    },
  });

module.exports = postModel;
