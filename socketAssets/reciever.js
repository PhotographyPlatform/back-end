// const io  = require('socket.io-client');
// import {io} from 'socket.io-client'
// import io  from './node_modules/socket.io-client';

const host = 'http://localhost:4001'
const socket = io.connect(host, { transports: ['websocket'] });




let btn = document.createElement('button')
document.body.append(btn)
btn.innerText = 'sent'

let input = document.querySelector('.input')
let counterEle = document.querySelector('.counter')



const obj = {  
     content  : '',
     receiverId : 1,
     senderId : 3,
     counter : 0

}

counterEle.onclick = (e) =>{
     
}



socket.emit('joinRoom' , obj)


btn.onclick = () =>{
     obj.content  = input.value
     socket.emit('message' ,obj )
}


socket.on('test', message => {
     console.log(message);
})

socket.on('notificaton' , message =>{
     console.log( message);
     let count = 0
     count++
     counterEle.innerHTML = count
})


socket.emit('test_1', 'hello from the client side')