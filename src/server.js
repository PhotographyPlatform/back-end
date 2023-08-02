'use strict'

// importing..
const express = require('express')
const cors = require('cors')
const app = express();

// using in app
app.use(cors())

// controller
app.get('/', (req, res) => {
    res.status(200).send('welcome to home page')
})

// listing to the server

function start(PORT) {
    app.listen(PORT, () => {
        console.log('running on port', PORT)
    })
}

module.exports = {
    start,
    app
}