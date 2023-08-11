"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("replys", {
    contant: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
    },
    commentid: {
      type: DataTypes.INTEGER,
    },
  });
