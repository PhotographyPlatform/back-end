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
      type: DataTypes.STRING,
      set(category) {
        const arr = JSON.stringify(category);
        this.setDataValue("category", arr);

        // console.log(JSON.parse("[\"animal\",\"summer\",\"black\"]"));
        console.log(JSON.parse(arr));
      },
    },
    challengeName: {
      type: DataTypes.STRING,
    },
    challengeID: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = postModel;
