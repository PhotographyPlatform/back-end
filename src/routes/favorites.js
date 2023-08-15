'use strict';

const express = require('express');
const modules = require('../models/index');
const favoritesRoute = express.Router();
const isAuth = require('../auth/middleWare/bearer')

favoritesRoute.post("/favorites", isAuth, handleAddToFavorites);

async function handleAddToFavorites(req, res, next) {
    try {
        let obj = req.body;
        obj["userid"] = req.users.userId;
        const postsAlreadyInFavorites = await modules.favorites.findAll();

        const postsIDs = postsAlreadyInFavorites.map(fav => fav.postid);

        let checker = 0;

        postsIDs.map(id => {
            if (id === obj.postid) checker++;
        });

        if (checker === 0) {
            const data = await modules.favorites.create(obj);
            res.status(201).json({
                message: req.modelName,
                data
            });
        }
        res.status(400).json({
            message: 'post already exist'
        });
    } catch (err) {
        next(err);
    }

}

favoritesRoute.get('/favorites', isAuth ,handleFavrites);

async function handleFavrites(req, res, next) {
    try {
        const userid = req.users.userId;
        // const userid = req.params.id;

        const userFavoritesPostsIDs = await modules.favorites.findAll({
            where: {
                userid: userid
            }
        });

        const favoritesPostIDs = userFavoritesPostsIDs.map(item => item.postid);

        const favorites = [];

        for (const post of favoritesPostIDs) {
            console.log(post);
            const posts = await modules.post.findOne({
                where: {
                    id: post
                }
            });

            favorites.push(posts);
        }

        res.status(200).json({
            favorites: favorites
        });

    } catch (err) {
        next(err)
    }
}

module.exports = favoritesRoute;
