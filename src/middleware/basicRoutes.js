'use strict'

const modules = require('../models')


async function handleGetAll(req, res, next) {
    try {
        const mod = req.model;
        const data = await mod.get();
        res.status(200).send(data);
    } catch (err) {
        next(err);
    }
}

async function handleGetOne(req, res, next) {
    try {
        let mod = req.model;
        const id = req.params.id;
        const data = await mod.get(id);
        res.status(200).json({
            message: req.modelName,
            data
        });
    } catch (err) {
        next(err);
    }
}

async function handleCreate(req, res, next) {
    try {
        const mod = req.model;
        const obj = req.body;
        
        const data = await mod.create(obj);
        res.status(201).json({
            message: req.modelName,
            data
        });
    } catch (err) {
        next(err);
    }
}


async function handleUpdate(req, res, next) {
    try {
        const mod = req.model;
        const obj = req.body;
        const id = req.params.id;

        const data = await mod.update(id, obj);
        res.status(203).json({
            message: req.modelName,
            data
        });
    } catch (err) {
        next(err);
    }
}

async function handlePatch(req, res, next) {
    try {
        const mod = req.model;
        const obj = req.body;
        const id = req.params.id;
        const data = await mod.update(id, obj);
        res.status(203).json({
            message: req.modelName,
            data
        });
    } catch (err) {
        next(err);
    }
    
}

async function handleDelete(req, res, next) {
    try {
        const mod = req.model;
        const id = req.params.id;

        const data = await mod.delete(id);
        res.status(204).json({
            message: req.modelName,
            data
        });
    } catch (err) {
        next(err);
    }
}

async function handleGetAllPostUser(req, res, next) {
    try {
        const id = req.params.userid;
        const theRecord = await modules.newUserCOll.readAll(id, modules.post, modules.comment, modules.like);
        res.status(200).json(theRecord)
    } catch (err) {
        next(err)
    }
}
async function handleGetAllPostData(req, res) {
    try {
    const id = req.params.Postid;
    const post = await modules.newPostCOll.getManyRelation(id, modules.like, modules.comment);
        res.status(200).json(post)
    } catch (err) {
        next(err)
    }
}

async function handleGetRelation(req, res) {
try{
    const model = req.params.module;
    const collection = req.params.collection;
    const id = req.params.idCollection;
    const post = await modules[collection].getRelation(id, model);
    res.status(200).json(post)
} catch (err) {
    next(err)
}
}

module.exports= {
    handleGetAll,
    handleGetOne,
    handleCreate,
    handleUpdate,
    handleDelete,
    handlePatch,
    handleGetAllPostUser,
    handleGetAllPostData,
    handleGetRelation
}
