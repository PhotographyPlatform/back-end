const notificationModel = (newSequlize, DataTypes) => newSequlize.define('notifications', {
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    actionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    actionType: {
        type: DataTypes.ENUM('comment', 'post', 'follow', "like"),
        allowNull: false
    },
    actionParentId: {
        type: DataTypes.INTEGER,
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = notificationModel;
