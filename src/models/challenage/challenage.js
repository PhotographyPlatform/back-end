"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("challenages", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brief: {
      type: DataTypes.TEXT,
    },
    prize: {
      type: DataTypes.TEXT,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    rules: {
      type: DataTypes.TEXT,
    },
    imgurl: {
      type: DataTypes.STRING,
    },
  });
