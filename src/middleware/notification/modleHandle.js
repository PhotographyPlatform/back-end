"use strict";
//  These functions are for handling notifications for Socket
const modules = require("../../models");

async function getNotificationById(userid) {
  try {
    const respons = await modules.notification.findAll({
      where: {
        receiverId: userid,
        // read: false,
      },
      // get all notification for userid
    });
    return respons;
  } catch (err) {
    console.log("There is an error when getting notifications by ID:: ", err);
  }
}

async function updateNotification(payload) {
  try {
    await modules.notificationCollection.update(payload.id, { read: true });
    return "Updated successfully";
  } catch (err) {
    console.log("There is an error when updating notifications by ID:: ", err);
  }
}

module.exports = {
  getNotificationById,
  updateNotification,
};
