const likeModel = (newSequlize, DataTypes) =>
  newSequlize.define("like", {
    postid: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    storyID: {
      type: DataTypes.INTEGER,
      uniqe: true,
    },
  });

module.exports = likeModel;
