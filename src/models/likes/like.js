const likeModel = (newSequlize, DataTypes) =>
  newSequlize.define("like", {
    postid: {
      type: DataTypes.INTEGER,
    },
    userid: {
      type: DataTypes.INTEGER,

    },
    storyID: {
      type: DataTypes.INTEGER,

    },
  });

module.exports = likeModel;
