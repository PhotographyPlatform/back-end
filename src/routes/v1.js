const express = require('express')
const modules = require('../models')
const v1Route = express.Router()
const login = require('../auth/models/authMiddleWare/login')
const { newPostCOll } = require('../models/index')
v1Route.get('/signup', (req, res) => {
     res.status(200).send('sign up page')
})

v1Route.post('/signup', async (req, res) => {
     const obj = req.body
     const createUSer = await modules.newUserCOll.create(obj)
     res.status(201).json({
          message: 'user created',
          name: createUSer.username
     })
})

v1Route.get('/login', async (req, res) => {

     res.status(200).json({
          message: 'user login page',
     })
})

v1Route.post('/login', login, async (req, res) => {

     res.status(200).json({
          message: 'user created',
          token: req.user.token

     })
})

v1Route.get('/:module', async (req, res) => {
     const mod = req.params.module
     const data = await modules[mod].get()
     res.status(200).send(data)
})

v1Route.get('/:module/:id', async (req, res) => {
     const mod = req.params.module
     const id = req.params.id
     const data = await modules[mod].get(id)
     res.status(200).json({
          message: 'done',
          data
     })
})

v1Route.post('/:module', async (req, res) => {
     const mod = req.params.module
     const obj = req.body
     const data = await modules[mod].create(obj)
     res.status(201).json({
          message: 'done',
          data
     })
})
v1Route.put('/:module/:id', async (req, res) => {
     const mod = req.params.module
     const obj = req.body
     const id = req.params.id

     const data = await modules[mod].update(id, obj)
     res.status(203).json({
          message: 'done',
          data
     })
})

v1Route.delete('/:module/:id', async (req, res) => {
     const mod = req.params.module
     const id = req.params.id

     const data = await modules[mod].delete(id)
     res.status(204).json({
          message: 'done',
          data
     })
})

v1Route.get('/getRelation/:module/:module2/:id', handlePostComment)

async function handlePostComment(req, res) {
     const model = req.params.module;
     const model2 = req.params.module2;
     const id = req.params.id;
     const post = await modules[model2].getRelation(id, model);
     res.status(200).json(post)
}

v1Route.get('/getManyRelation/:id/:module/:module2', getManyRelation)
async function getManyRelation(req, res) {
     const collection = req.params.collection;
     const model = req.params.module;
     const model2 = req.params.module2;
     const id = req.params.id;
     const post = await modules.newPostCOll.getManyRelation(id, model, model2);
     res.status(200).json(post)
}

v1Route.get('/getall/:module/:id', allData)
async function allData(req, res) {
     const id = req.params.id;
     const model = req.params.module
     const theRecord = await modules[model].readAll(id, modules.post, modules.comment, modules.like);
     res.status(200).json(theRecord)
}
v1Route.get('/Followers/:module/:id', Followers)
async function Followers(req, res) {
     const id = req.params.id;
     const type = req.params.type
     const model = req.params.module

     const theRecord = await modules[model].followers(id, modules.user);
     res.status(200).json(theRecord)
}
v1Route.get('/Following/:module/:id', following)
async function following(req, res) {
     const id = req.params.id;
     const type = req.params.type
     const model = req.params.module

     const theRecord = await modules[model].following(id, modules.user);
     res.status(200).json(theRecord)
}

v1Route.get('/home/:module/:id', async (req, res) => {
     const id = req.params.id;
     const model = req.params.module
     const theRecord = await modules[model].Feeds(id, newPostCOll.model);
     res.status(200).json(theRecord)
})

module.exports = v1Route


