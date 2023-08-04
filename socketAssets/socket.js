// const io  = require('socket.io-client');
// import {io} from 'socket.io-client'
// import { io } from 'socket.io-client';


 

// console.log('hello');

const host = 'http://localhost:4001'
const socket = io.connect(host, { transports: ['websocket'] });






let btn = document.createElement('button')
document.body.append(btn)
btn.innerText = 'join'

let input = document.querySelector('.input')

const obj = {
     content  : '',
     receiverId : 1,
     senderId : 3
}

socket.emit('joinRoom' , obj)


btn.onclick = () =>{
     obj.content  = input.value
     socket.emit('message' ,obj)
}


socket.on('test' , message =>{
     console.log(message);
})


socket.emit('test_1' , 'hello from the client side')