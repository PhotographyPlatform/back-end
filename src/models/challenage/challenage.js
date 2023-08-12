"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("challenages", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brief: {
      type: DataTypes.STRING,
    },
    prize: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    rules: {
      type: DataTypes.STRING,
      set(rules) {
        let rule = JSON.stringify(rules);
        this.setDataValue("rules", rule);
      },
    },
    imgurl: {
      type: DataTypes.STRING,
    },
  });
