const express = require('express')
const authRoutes = express.Router()
const login = require("./middleWare/login");
const modules = require('../models')


authRoutes.get('/login', async (req, res) => {

    res.status(200).json({
        message: 'user login page',
    })
})

authRoutes.post('/login',login, async (req, res) => {
    res.status(200).json({
        message: 'user created',
        token: req.user.token
    })
})



authRoutes.get('/signup', (req, res) => {
    res.status(200).send('sign up page')
})


authRoutes.post('/signup', async (req, res) => {
    const obj = req.body
    const createUSer = await modules.newUserCOll.create(obj)
    res.status(201).json({
        message: 'user created',
        name: createUSer.username
    })
})


module.exports = authRoutes;