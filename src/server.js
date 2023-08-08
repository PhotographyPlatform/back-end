'use strict'

// importing..
const express = require('express')
const cors = require('cors');
const v1Route = require('./routes/v1');
const router = require('./routes/v2')
const bearer = require("./auth/middleWare/bearer")
const chatRoute = require('./routes/chat');
const searchRoute = require('./routes/search');
const logger = require('./middleware/logger');
const authRoutes = require('./auth/routes');
const followRoute = require('./routes/follow');
const erorr404 = require("./error-handlers/404")
const erorr500 = require("./error-handlers/500");
const postPageRoute = require('./routes/RequestPhotogrpher/post_page');
const profileRoute = require('./routes/profile')
const notifiRoute = require("./routes/notification");
const app = express();
// app.use(cors())
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
        socket.broadcast.to(room).emit('notificaton', data.counter);

        socket.on('applyRemove', () => {
            data.counter = 0
            socket.broadcast.to(room).emit('removeCounter', data.counter);
        })
    });
})
const notificationName = io.of('/notification');

notificationName.on('connection', socket => {
    socket.on("comment", payload => {

        const commentEvent = `comment-${payload.userid}`;
        notificationName.emit(commentEvent, payload);
    })
    socket.on("update", (payload => {
        notificationName.emit("update", payload);
    }))
    console.log('((notification)) connected with ID of ', socket.id);
});


// using in app
app.use(express.json())
app.use(v1Route)
app.use(chatRoute)
app.use(searchRoute);
app.use(authRoutes)
app.use(followRoute);
app.use(postPageRoute);

app.use(router)
app.use(profileRoute);
app.use(notifiRoute);
// controller
app.get('/', (req, res) => {
    try {
        res.status(200).send('welcome to home page')
    } catch (err) {
        next(err)
    }
})

// error handler
app.use('*', erorr404);
app.use(erorr500);
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