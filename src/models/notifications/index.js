const notificationModel = (newSequlize, DataTypes) => newSequlize.define('notifications', {
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = notificationModel;
