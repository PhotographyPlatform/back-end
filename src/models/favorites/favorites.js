'use strict';

const favoritesModel = (newSequlize, DataTypes) => newSequlize.define('favorites', {
    userid: {
         type: DataTypes.INTEGER,
         uniqe: true
    },
    postid: {
         type: DataTypes.INTEGER,
         uniqe: true
    }
})

module.exports = favoritesModel;
