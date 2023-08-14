const { newSequlize, DataTypes } = require("..");

const chatModel = (newSequlize, DataTypes) =>
  newSequlize.define("chats", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // senderid:{
    //      type:DataTypes.INTEGER,
    //      // allowNull : false
    // },
    // receiverid:{
    //      type:DataTypes.INTEGER,
    //      // allowNull : false
    // }
  });

module.exports = chatModel;
