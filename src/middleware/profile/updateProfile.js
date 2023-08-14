'use strict'

const { user } = require("../../models")
module.exports = async (req, res, next) => {
    const data = req.data
    const body = req.body
    if (body) {
        if (body.name) {
            const updateName = await user.findOne({ where: { username: body.name } })
            updateName === null ? await data.update({ username: body.name }) : next('username is already exits')
        }
        await data.update({ password: body.password })
        await data.update({ birthday: body.birthday })
        await data.update({ gender: body.gender })
        await data.update({ img: req.image })

    }
    next()
}