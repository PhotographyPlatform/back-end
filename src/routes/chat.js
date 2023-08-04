const express = require('express')
const { chatCollection, newUserCOll } = require('../models')
const chatRoute = express.Router()
const login = require('../auth/middleWare/login')



chatRoute.get('/chat/:senderID/:reciverID', async (req, res) => {
     const reciverID = req.params.reciverID
     const senderID = req.params.senderID
     const data = await newUserCOll.SendandRecieveMessage(senderID, reciverID)


     res.status(200).send(data)
})




chatRoute.post('/chat/:senderID/:reciverID', async (req, res) => {
     const content = req.body.content
     const reciverID = req.params.reciverID
     const senderID = req.params.senderID

     const obj = {
          content: content,
          receiverId: reciverID,
          senderId: senderID
     }


     const data = await chatCollection.create(obj)
     res.status(201).json({
          data
     })
})


chatRoute.put('/chat/:id/:senderID/:reciverID', async (req, res) => {
     const id = req.params.id
     const content = req.body.content
     const reciverID = req.params.reciverID
     const senderID = req.params.senderID

     const obj = {
          content: content,
          receiverId: reciverID,
          senderId: senderID
     }

     const data = await chatCollection.update(id, obj)
     res.status(203).json({
          data
     })
})

chatRoute.delete('/chat/:id/:senderID/:reciverID', async (req, res) => {
     const id = req.params.id

     const data = await chatCollection.delete(id)
     res.status(204).json({
          data
     })
})





chatRoute.get('/getmessages/:senderID/:reciverID', async (req, res) => {
     const reciverID = req.params.reciverID
     const senderID = req.params.senderID
     const data = await newUserCOll.SendandRecieveMessage(senderID, reciverID)

     res.status(200).json({
          respones: data
     })
})


module.exports = chatRoute;