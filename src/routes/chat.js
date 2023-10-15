const express = require('express')
const { chatCollection, newUserCOll , chat , user} = require('../models')
const chatRoute = express.Router()
const isAuth = require('../auth/middleWare/bearer');
const { Op } = require('sequelize');


chatRoute.get('/chat/:reciverID', isAuth , async (req, res , next) => {
     try {
          const reciverID = req.params.reciverID
          const senderID = req.users.userId
          const data = await newUserCOll.SendandRecieveMessage(senderID, reciverID)
          res.status(200).send(data)
     } catch (err) {
          next(err)
     }
})



chatRoute.get('/messegeslist/:id', async (req, res, next) => {
     try {
       const id = req.params.id
       const records = await chat.findAll({
         where: {
           [Op.or]: [
               { senderId: id },
               { receiverId: id }
           ]
       }
       });
     
       let arr = []
     
       // records.map(ele => {
       //   if (ele.senderId !== id) {
       //     if (!arr.includes(ele.receiverId)) {
       //       arr.push(ele.receiverId)
       //     }
       //   }
       //   else if (ele.receiverId !== id) {
       //     if (!arr.includes(ele.senderId)) { 
       //       arr.push(ele.senderId)
       //     }
       //   }
       // })
       
       records.map(ele => {
         if (ele.senderId !== +id) {
           console.log(ele.senderId , 'ele.senderId');
           console.log(+id , 'id');
           if (!arr.includes(ele.senderId)) {
             arr.push(ele.senderId)
           }
         }
     
         else if (ele.receiverId !== +id) {
           if (!arr.includes(ele.receiverId)) { 
             arr.push(ele.receiverId)
           }
         }
       })
       
       async function fetchData(arr) {
         let obj = [];
       
         for (const ele of arr) {
           let data = await user.findByPk(ele);
           //
           const res = await newUserCOll.SendandRecieveMessage(id, ele)
           let msg = [...res.sendData, ...res.resieveData]
           msg.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
           //
     
           obj.push({data , messages : msg});
         }
         return obj
       }
     
       res.status(200).json({
         data : await fetchData(arr)
       })
       
     } catch (err) {
       next(err)
     }
})

chatRoute.get('/allUserMessages',isAuth , async (req, res, next) => {
     try {
          const userID = req.users.userId

          const result = await chat.findAll({ where: { receiverId: userID } })
          res.status(200).json({
               recievedData : result
          })

     } catch (err) {
          next(err)
     }
})



chatRoute.post('/chat/:senderID/:reciverID',isAuth , async (req, res,  next) => {
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

chatRoute.put('/chat/:id/:reciverID',isAuth , async (req, res,  next) => {
     try {
          const id = req.params.id
          const content = req.body.content
          const reciverID = req.params.reciverID
          const senderID = req.users.userId


          const obj = {
               read : req.body.read, 
               content: content,
               // receiverId: reciverID,
               // senderId: senderID,
          }

          const data = await chatCollection.update(id, obj)
          res.status(203).json({
               data
          })
     } catch (err) {
          next(err)
     }
})

chatRoute.delete('/chat/:id',isAuth , async (req, res,  next) => {
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

// chatRoute.get('/getmessages/:senderID/:reciverID', async (req, res,  next) => {
//      try {
//           const reciverID = req.params.reciverID
//           const senderID = req.params.senderID
//           const data = await newUserCOll.SendandRecieveMessage(senderID, reciverID)

//           res.status(200).json({
//                respones: data
//           })
//      } catch (err) {
//           next(err)
//      }
// })

module.exports = chatRoute;