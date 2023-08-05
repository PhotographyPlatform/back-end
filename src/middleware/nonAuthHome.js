'use strict'
const data = require('../models')
module.exports = async (req, res) => {
    const users = await data.newUserCOll.get()
    const userData = users.map(ele => {
        return { id: ele.id, name: ele.username, post: ele.img }
    })
    userData.splice(3)
    res.status(200).json(userData)
}