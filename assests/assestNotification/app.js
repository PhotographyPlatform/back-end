// import io from ('socket.io-client');
const port = 3001;
const nameSpacehost = `http://localhost:${port}/notification`;
const socket = io.connect(nameSpacehost, { transports: ['websocket'] });
const userid = 1;
const notificationEvent = `notification-${userid}`;

// const commentInput = document.querySelector("#commentInput")
const button = document.querySelector(".btn")
const commentInput = document.querySelector(".comment-input");
// console.log(button)








let commentDetails = {
    "contant": "nicePhoto",
    "sender": null,
    "resever": 3
    // "type":""
}

// let value = null;
// commentInput.onchange = () => {
//     value = parseInt(commentInput.value);
//     commentDetails.sender = value;
//     socket.emit('join-room', value);
// }

// button.onclick = () => {
//     socket.emit('send-notification', commentDetails);
// };

// socket.on('send', payload => {
//     console.log(payload)
// })











// socket.emit = ("notification", commentDetails);

socket.emit("notification", userid);

socket.on(notificationEvent, (payload) => {

    console.log(payload);
    // socket.emit("update", payload);
})

socket.on(`newRecord-${ notificationEvent }`, payload => {
    console.log(payload);
})

