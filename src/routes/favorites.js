"use strict";

const express = require("express");
const modules = require("../models/index");
const favoritesRoute = express.Router();
const isAuth = require("../auth/middleWare/bearer");

favoritesRoute.post("/favorites", isAuth, handleAddToFavorites);

async function handleAddToFavorites(req, res, next) {
  try {
    let obj = req.body;
    obj["userid"] = req.users.userId;
    const postsAlreadyInFavorites = await modules.favorites.findAll();
    
    const favElemnt = postsAlreadyInFavorites.map((fav) => {return {postid:fav.postid, userid:fav.userid}});

    const exists = favElemnt.some(fav => fav.userid === obj.userid && fav.postid === obj.postid);

    if (!exists) {
      const data = await modules.favorites.create(obj);
      res.status(201).json({
        message: req.modelName,
        data,
      });
    }
    res.status(400).json({
      message: "post already exist",
    });
  } catch (err) {
    next(err);
  }
}

favoritesRoute.get("/favorites", isAuth, handleFavrites);

async function handleFavrites(req, res, next) {
  try {
    const userid = req.users.userId;
    
    const userFavoritesPostsIDs = await modules.favorites.findAll({
      where: {
        userid: userid,
      },
    });
    
    const favoritesPostIDs = userFavoritesPostsIDs.map((item) => item.postid);

    const favorites = [];

    for (const post of favoritesPostIDs) {
      const posts = await modules.post.findOne({
        where: {
          id: post,
        },
      });

      favorites.push(posts);
    }
    res.status(200).json({
      favorites: favorites,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = favoritesRoute;
