'use strict';

const reportModel = (newSequlize, DataTypes) =>
    newSequlize.define('report', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        actionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        actionType: {
            type: DataTypes.ENUM('comment', 'post', 'user'),
            allowNull: false
        },
        categories: {
            type: DataTypes.ENUM(
                'Spam',
                'Inappropriate pictures',
                'Hate Speech',
                'Violence',
                'Abuse',
                'Misinformation',
                'Other')
        },
        details: {
            type: DataTypes.STRING
        },
    })

module.exports = reportModel;