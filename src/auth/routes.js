const express = require('express')
const authRoutes = express.Router()
const login = require("./middleWare/login");
const modules = require('../models')
const sendCode = require('../auth/middleWare/verifyEmail')

// store the obj and the code in queue
let obj = null;
let codeObj = null

authRoutes.get('/login', async (req, res) => {

    res.status(200).json({
        message: 'user login page',
    })
})

authRoutes.post('/login', login, async (req, res) => {
    res.status(200).json({
        message: 'user created',
        token: req.user.token
    })
})

authRoutes.post('/signup', sendCode, async (req, res) => {
    const codes = req.users
    codeObj = codes
    const data = req.body
    obj = data
    res.status(200).json(`code has been send to ${req.body.email}`)
})

authRoutes.post('/signup/confirm', async (req, res) => {
    const code = req.body.codes
    console.log(codeObj);
    console.log(code);
    if (code === codeObj) {
        const createUSer = await modules.newUserCOll.create(obj)
        obj = null
        codeObj = null
        res.status(200).json({ id: createUSer.id, username: createUSer.username, Email: createUSer.email })
    } else {
        res.status(500).json('wrong codes')
    }

})

module.exports = authRoutes;