'use strict'

const story = (newSequlize, DataTypes) => newSequlize.define('stories', {
    storyUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userid: {
        type: DataTypes.INTEGER
    },
})

module.exports = story;