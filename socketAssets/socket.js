// const io  = require('socket.io-client');
// import {io} from 'socket.io-client'
// import { io } from 'socket.io-client';

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
     obj.counter = 0
     counterEle.innerText = obj.counter
     
     socket.emit('applyRemove')
     socket.on('removeCounter' , data =>{
          obj.counter = data
     })
}



socket.emit('joinRoom' , obj)


btn.onclick = () =>{
     obj.content  = input.value
     obj.counter++
     console.log(obj.counter);
     socket.emit('message' ,obj)

}


socket.on('test', message => {
     console.log(message);
})

socket.on('notificaton' , message =>{
     console.log( message);
     counterEle.innerText = message

})


socket.emit('test_1', 'hello from the client side')