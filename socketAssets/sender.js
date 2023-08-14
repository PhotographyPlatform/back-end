// const io  = require('socket.io-client');
// import io  from './node_modules/socket.io-client';

const host = "http://localhost:4001";
const socket = io.connect(host, { transports: ["websocket"] });

// let btn = document.createElement('button')
// document.body.append(btn)
// btn.innerText = 'sent'

let btn = document.querySelector(".btn");

let input = document.querySelector(".input");
let counterEle = document.querySelector(".counter");
let chatBOx = document.querySelector(".chatbox");
let chat = document.querySelector(".chat");

// let sender = window.location.pathname.split("/");
let sender = window.location.search;
let reqx = /[0-9]+/g;
let values = sender.match(reqx);
console.log(values);

const obj = {
  content: "",
  receiverId: 3,
  senderId: 1,
  counter: 0,
  read: false,
};

socket.emit("joinRoom", obj);

btn.onclick = () => {
  obj.content = input.value;

  // let text = document.createElement("div");
  // text.classList.add("message");
  // text.classList.add("outgoing");
  // text.innerText = input.value;
  // chat.append(text);

  socket.emit("message", obj);
};

socket.on("notificaton", (count) => {
  counterEle.style.display = "inline-block";
  counterEle.innerHTML = count;
  // socket.emit('zero')
});

socket.on("test", (message) => {
  console.log(message, "message");

  let text = document.createElement("div");

  // text.classList.add("message");
  // text.classList.add("incoming");
  // text.innerText = message;
  // chat.append(text);

  socket.on("incoming", (incoming) => {
    text.classList.add("message");
    text.classList.add("incoming");
    text.innerText = message;
    chat.append(text);
  });

  socket.on("outgoing", (outgoing) => {
    text.classList.add("message");
    text.classList.add("outgoing");
    text.innerText = message;
    chat.append(text);
  });
});

counterEle.onclick = (e) => {
  counterEle.innerHTML = 0;
  socket.emit("zero");
};

// socket.emit('test_1', 'hello from the client side')
