
const port = 3000;
const nameSpacehost = `http://localhost:${port}/notification`;
let userId = null

let inputText = document.querySelector('.id-input');

inputText.onchange = () => {
    const socket = io.connect(nameSpacehost, { transports: ['websocket'] });

    userId = parseInt(inputText.value);
    console.log(inputText.value)
    socket.emit("notification", userId);
    const notificationEvent = `notification-${userId}`;

    // socket.emit("notification", userid);
    socket.on(notificationEvent, (payload) => {
        console.log(payload);
        socket.emit("update", payload);
    })


    socket.on(`newRecord-${notificationEvent}`, payload => {
        console.log(payload);
    })


}







// const commentInput = document.querySelector("#commentInput")
// const button = document.querySelector(".btn")
// const commentInput = document.querySelector(".comment-input");
// console.log(button)

// let commentDetails = {
//     "contant": "nicePhoto",
//     "sender": null,
//     "resever": 3
//     // "type":""
// }

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
