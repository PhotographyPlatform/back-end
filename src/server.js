'use strict'

// importing..
const express = require('express')
const cors = require('cors');
const { newPostCOll } = require('./models');
const v1Route = require('./routes/v1');
const bearer = require('./auth/models/authMiddleWare/bearer');
const app = express();


// using in app
app.use(cors())
app.use(express.json())
app.use(v1Route)

// controller
app.get('/', bearer ,(req, res) => {
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