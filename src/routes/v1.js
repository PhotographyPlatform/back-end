"use strict";
const { Op } = require('sequelize');

const express = require("express");
const modules = require("../models");
const v1Route = express.Router();
const middleware = require("../middleware/basicRoutes");
const { where } = require("sequelize");
const FeedsClass = require('../models/feeds-collection');
const isAuth = require('../auth/middleWare/bearer');


v1Route.param("model", (req, res, next) => {
  const modelName = req.params.model;
  if (modules[modelName]) {
    req.model = modules[modelName];
    req.modelName = modelName;
    next();
  } else {
    next("Invalid Model");
  }
});

// Basic Routes
v1Route.get("/v1/:model", middleware.handleGetAll);
v1Route.get("/v1/:model/:id", middleware.handleGetOne);
v1Route.post("/v1/:model", middleware.handleCreate);
v1Route.put("/v1/:model/:id", middleware.handleUpdate);
v1Route.patch("/v1/:model/:id", middleware.handlePatch);
v1Route.delete("/v1/:model/:id", middleware.handleDelete);
v1Route.get("/getallPostUser/:userid", middleware.handleGetAllPostUser);
v1Route.get("/getAllPostData/:Postid", middleware.handleGetAllPostData);





v1Route.get("/suggestPost/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    let allLike = await modules.like.findAll({ where: { userid: id } });
    let interested = [];
    for (const item of allLike) {
      await modules.post.findByPk(item.dataValues.postid).then(data => {
        interested.push(data.dataValues.category);
      })
      interested = [].concat(...interested).filter(item => item !== null);
    }

    let FrequentCategory = findMostFrequentItems(interested)
    // FrequentCategory = FrequentCategory[0].toString();

    let postInterested = await modules.post.findAll({
      where: {
        category: {
          [Op.contains]: FrequentCategory
        }
      }
    })

    let postIdLikedBefore = allLike.map(likeRecord => {
  
      return likeRecord.postid;
    })

    let suggestion = postInterested.map(post => {
      if (!postIdLikedBefore.includes(post.id)) {
        console.log(post)
        return (post);
      }
    })
    suggestion = suggestion.filter(item => item !== null && item !== undefined);


    res.status(200).json(
      suggestion
    )
  } catch (err) {
    next(err);
  }
});

function findMostFrequentItems(arr) {
  const frequencyMap = {};

  // Create a frequency map
  arr.forEach(item => {
    if (frequencyMap[item]) {
      frequencyMap[item]++;
    } else {
      frequencyMap[item] = 1;
    }
  });

  // Find the maximum frequency
  let maxFrequency = 0;
  for (const item in frequencyMap) {
    if (frequencyMap[item] > maxFrequency) {
      maxFrequency = frequencyMap[item];
    }
  }

  // Find items with the maximum frequency
  const mostFrequentItems = [];
  for (const item in frequencyMap) {
    if (frequencyMap[item] === maxFrequency) {
      mostFrequentItems.push(item);
    }
  }
  return mostFrequentItems;
}


// Feeds 

v1Route.get("/fullyFeeds/:id", async (req, res, next) => {
  try {

    const Feeds = new FeedsClass(req.params.id);
    let record = await Feeds.getAllData();

    res.status(200).json(record);
  } catch (err) {
    next(err);
  }
});

// get user messeges list 

// v1Route.get('/messegeslist/:id', async (req, res, next) => {
//   try {
//     const id = req.params.id
//     const records = await modules.chat.findAll({
//       where: {
//         [Op.or]: [
//             { senderId: id },
//             { receiverId: id }
//         ]
//     }
//     });
  
//     let arr = []
  
//     // records.map(ele => {
//     //   if (ele.senderId !== id) {
//     //     if (!arr.includes(ele.receiverId)) {
//     //       arr.push(ele.receiverId)
//     //     }
//     //   }
//     //   else if (ele.receiverId !== id) {
//     //     if (!arr.includes(ele.senderId)) { 
//     //       arr.push(ele.senderId)
//     //     }
//     //   }
//     // })
    
//     records.map(ele => {
//       if (ele.senderId !== +id) {
//         console.log(ele.senderId , 'ele.senderId');
//         console.log(+id , 'id');
//         if (!arr.includes(ele.senderId)) {
//           arr.push(ele.senderId)
//         }
//       }
  
//       else if (ele.receiverId !== +id) {
//         if (!arr.includes(ele.receiverId)) { 
//           arr.push(ele.receiverId)
//         }
//       }
//     })
    
//     async function fetchData(arr) {
//       let obj = [];
    
//       for (const ele of arr) {
//         let data = await modules.user.findByPk(ele);
//         //
//         const res = await modules.newUserCOll.SendandRecieveMessage(id, ele)
//         let msg = [...res.sendData, ...res.resieveData]
//         msg.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
//         //
  
//         obj.push({data , messages : msg});
//       }
//       return obj
//     }
  
//     res.status(200).json({
//       data : await fetchData(arr)
//     })
    
//   } catch (err) {
//     next(err)
//   }
// })








// this route for get reply form any comment
v1Route.get(
  "/getAllPostDataWithReplies",
  middleware.handleGetAllPostDataWithReplies
);

// Get Data between two relation collection and modle
v1Route.get(
  "/getRelation/:collection/:module/:idCollection",
  middleware.handleGetRelation
);
v1Route.get(
  "/getChallenge/:idCollection",
  middleware.handleGetRelationWithComAndLikes
);

module.exports = v1Route;
