'use strict'

async function handleGetAll(req, res) {
    const mod = req.model;
    const data = await mod.get()
    res.status(200).send(data)
}


async function handleGetOne(req, res) {
    let mod = req.model;
    const id = req.params.id;
    const data = await mod.get(id)
    res.status(200).json({
        message: req.modelName,
        data
    })
}

async function handleCreate(req, res) {
    const mod = req.model
    const obj = req.body
    const data = await mod.create(obj)
    res.status(201).json({
        message: req.modelName,
        data
    })
}
async function handleUpdate(req, res) {
    const mod = req.model;
    const obj = req.body
    const id = req.params.id

    const data = await mod.update(id, obj)
    res.status(203).json({
        message: req.modelName,
        data
    })
}

async function handleDelete(req, res) {
    const mod = req.model;
    const id = req.params.id

    const data = mod.delete(id)
    res.status(204).json({
        message: req.modelName,
        data
    })
}


module.exports= {
    handleGetAll,
    handleGetOne,
    handleCreate,
    handleUpdate,
    handleDelete
}
