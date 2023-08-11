'use strict';

const express = require('express');
const modules = require('../models/index');
const favoritesRoute = express.Router();

favoritesRoute.get('/favorites/:id', handleFavrites);

async function handleFavrites(req, res, next) {
    try {
        const userid = req.params.id;
        
        const userFavoritesPostsIDs = await modules.favorites.findAll({
            where: {
                userid:userid
            }
        });

        const favoritesPostIDs = userFavoritesPostsIDs.map(item => item.postid);

        const favorites =[];
        
        for (const post of favoritesPostIDs) {
            console.log(post);
            const posts = await modules.post.findOne({
                where: {
                    id:post
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
