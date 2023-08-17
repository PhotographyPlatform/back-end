"use strict";

const express = require('express')
const modules = require('../models')
const adminRoute = express.Router()
const middleware = require('../middleware/basicRoutes');
const acl = require('../auth/middleWare/acl');
const isAuth = require('../auth/middleWare/bearer');

//admin reports
adminRoute.get("/admin/report/:id", isAuth, acl('admin'), handleGetOne);
adminRoute.get("/admin/report", isAuth, acl('admin'), handleGetAll);
adminRoute.delete("/admin/report/:id", isAuth, acl('admin'), handleDelete);

//add a challenge
adminRoute.post('/admin/challenge', isAuth, acl('admin'), handleAddChallenge);

//get all the challenges with their posts
adminRoute.get("/admin/getRelation/:collection/:module/:idCollection", isAuth, acl('admin'),middleware.handleGetRelation);

//get all the posts with their comments nad likes and replies
adminRoute.get("/admin/getAllPostDataWithReplies", isAuth, acl('admin') ,middleware.handleGetAllPostDataWithReplies);

//for users
adminRoute.get("/admin/getallPostUser/:userid",isAuth, acl('admin'), middleware.handleGetAllPostUser);

//for posts
adminRoute.get("/admin/getAllPostData/:Postid",isAuth, acl('admin'), middleware.handleGetAllPostData);

adminRoute.param('model', (req, res, next) => {
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
adminRoute.get("/admin/:model",isAuth, acl('admin'), middleware.handleGetOne);
adminRoute.get("/admin/:model/:id",isAuth, acl('admin'), middleware.handleGetAll);
adminRoute.post("/admin/:model",isAuth, acl('admin'), middleware.handleCreate);
adminRoute.put("/admin/:model/:id",isAuth, acl('admin'), middleware.handleUpdate);
adminRoute.patch("/admin/:model/:id",isAuth, acl('admin'), middleware.handlePatch);
adminRoute.delete("/admin/:model/:id",isAuth, acl('admin'), middleware.handleDelete);

async function handleGetOne(req, res, next) {
    try {
        const id = req.params.id
        const respons = await modules.reportCollection.get(id);
        res.status(200).json(respons);
    } catch (err) {
        next(err)
    }
}

async function handleGetAll(req, res, next) {
    try {
        const respons = await modules.reportCollection.get();
        res.status(200).json(respons);
    } catch (err) {
        next(err);
    }
}

async function handleDelete(req, res, next) {
    try {
        const id = req.params.id
        const respons = await modules.reportCollection.delete(id);
        res.status(204).json(respons);
    } catch (err) {
        next(err);
    }
}

async function handleAddChallenge(req, res, next) {
    try {
        const obj = req.body;
        const respons = await modules.challenagesCollection.create(obj);
        console.log(respons);
        res.status(201).json(respons);
    } catch (err) {
        next(err)
    }
}

module.exports = adminRoute;
