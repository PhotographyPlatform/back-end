// import io from ('socket.io-client');
const port = 3000;
const nameSpacehost = `http://localhost:${port}/notification`;
const socket = io.connect(nameSpacehost, { transports: ['websocket'] });
const userid = 6;
const commentEvent = `comment-${userid}`;
socket.on(commentEvent, (payload) => {
    console.log("------------")
    console.log(payload)
    if (payload.object !== null) socket.emit('update', payload);
})


