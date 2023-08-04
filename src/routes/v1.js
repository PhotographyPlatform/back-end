const express = require('express')
const modules = require('../models')
const v1Route = express.Router()
const middleware = require('../middleware/basicRoutes');
v1Route.param('model', (req, res, next) => {
     const modelName = req.params.model;
     if (modules[modelName]) {
          req.model = modules[modelName];
          req.modelName = modelName;
          next();
     } else {
          next('Invalid Model');
     }
});

// Basic Routes
v1Route.get('/v1/:model', middleware.handleGetOne);
v1Route.get('/v1/:model/:id', middleware.handleGetAll);
v1Route.post('/v1/:model', middleware.handleCreate);
v1Route.put('/v1/:model/:id', middleware.handleUpdate);
v1Route.delete('/v1/:model/:id', middleware.handleDelete);
v1Route.get('/getallPostUser/:userid', middleware.handleGetAllPostUser);
v1Route.get('/getAllPostData/:Postid', middleware.handleGetAllPostData)

// Get Data between two relation collection and modle
v1Route.get('/getRelation/:collection/:module/:idCollection', middleware.handleGetRelation)




module.exports = v1Route


