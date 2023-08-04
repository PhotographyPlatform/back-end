'use strict'

// importing..
const express = require('express')
const cors = require('cors');
const v1Route = require('./routes/v1');
const bearer = require("./auth/middleWare/bearer")
const chatRoute = require('./routes/chat');
const logger = require('./middleware/logger');
const authRoutes = require('./auth/routes');

const app = express();
app.use(cors())
app.use(logger)


const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
    console.log('connect to the main ', socket.id);

    socket.on('joinRoom', (message) => {
        const room = `room users ${message.receiverId} - ${message.senderId}`

        // socket.join(room);
        socket.join(room);

        console.log(room, ' joined');
    })



    socket.on('message', (data) => {
        const room = `room users ${data.receiverId} - ${data.senderId}`

        // socket.emit('sendRoom' , room)

        io.to(room).emit('test', data.content);
    });


})


// using in app

app.use(express.json())
app.use(v1Route)
app.use(chatRoute)
app.use(authRoutes)

// controller
app.get('/', (req, res) => {
    res.status(200).send('welcome to home page')
})





// listing to the server

function start(PORT) {
    server.listen(PORT, () => {
        console.log('running on port', PORT)
    })
}

module.exports = {
    start,
    server,
    app
}