const express = require('express')
const { chatCollection, newUserCOll } = require('../models')
const chatRoute = express.Router()

chatRoute.get('/chat/:senderID/:reciverID', async (req, res) => {
     try {
          const reciverID = req.params.reciverID
          const senderID = req.params.senderID
          const data = await newUserCOll.SendandRecieveMessage(senderID, reciverID)
          res.status(200).send(data)
     } catch (err) {
          next(err)
     }
})


chatRoute.post('/chat/:senderID/:reciverID', async (req, res,  next) => {
     try {
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
     } catch (err) {
          next(err)
     }
})

chatRoute.put('/chat/:id/:senderID/:reciverID', async (req, res,  next) => {
     try {
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
     } catch (err) {
          next(err)
     }
})

chatRoute.delete('/chat/:id/:senderID/:reciverID', async (req, res,  next) => {
     try {
          const id = req.params.id

          const data = await chatCollection.delete(id)
          res.status(204).json({
               data
          })
     } catch (err) {
          next(err)
     }
})

chatRoute.get('/getmessages/:senderID/:reciverID', async (req, res,  next) => {
     try {
          const reciverID = req.params.reciverID
          const senderID = req.params.senderID
          const data = await newUserCOll.SendandRecieveMessage(senderID, reciverID)

          res.status(200).json({
               respones: data
          })
     } catch (err) {
          next(err)
     }
})

module.exports = chatRoute;