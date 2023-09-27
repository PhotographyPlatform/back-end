"use strict";


const categoriesModel = (newSequlize, DataTypes) => newSequlize.define('categories', {
    imgurl: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
    },
});

module.exports = categoriesModel;
