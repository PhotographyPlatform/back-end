const express = require('express')
const modules = require('../models')
const notifiRoute = express.Router()
const middleware = require('../middleware/basicRoutes');
const handlecomment = require('../middleware/comment')
const io = require('socket.io-client');

require('dotenv').config();
const port = process.env.PORT || 5000;
const nameSpacehost = `http://localhost:3007/notification`;
const nameSpaceSocket = io.connect(nameSpacehost);
notifiRoute.get('/notification/:userid', async (req, res, next) => {
    try {
        const userid = req.params.userid;
        const respons = await modules.notification.findAll({
            where: {
                userid, read: false
            }
        })

        if (respons.length === 0) {
            let data = {
                userid: userid,
                object: null
            };
            nameSpaceSocket.emit('comment', data);
            res.status(200).json("Notification is Empty")
        } else {
            respons.map(ele => {
                ele = {
                    userid: ele.userid,
                    object: ele
                }
                nameSpaceSocket.emit('comment', ele);
            })
            nameSpaceSocket.on("update", (payload) => {
                updateRead(payload);
            })
            res.status(200).json(respons)
        }
    } catch (err) {
        next(err);
    }
})


async function updateRead(payload) {
    
        console.log(payload.id)
        const res = await modules.notificationCollection.update(payload.object.id, { read: true });
        return "Updated successfully"
}



module.exports = notifiRoute;