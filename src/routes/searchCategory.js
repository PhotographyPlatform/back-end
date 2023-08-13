'use strict';

const express = require('express');
const modules = require('../models/index');
const searchCategoryRoute = express.Router();
const { Op } = require('sequelize');

searchCategoryRoute.get('/searchCategory/:searchword', handleFavrites);

async function handleFavrites(req, res, next) {
    try {
        const searchWord = req.params.searchword;

        const posts = await modules.post.findAll({
        where: {
            category: {
            [Op.contains]: [searchWord]
            }
        }
        });

        res.status(200).json({
        searchResults: posts
        });

    } catch (err) {
        next(err)
    }
}

module.exports = searchCategoryRoute;