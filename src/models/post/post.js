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
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    challengeName: {
      type: DataTypes.STRING,
    },
    challengeID: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });

module.exports = postModel;
