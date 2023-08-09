// const io  = require('socket.io-client');
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
     receiverId : 3,
     senderId : 1,
     counter : 0
}


socket.emit('joinRoom' , obj)


btn.onclick = () =>{
     obj.content  = input.value
     socket.emit('message' ,obj )
}


socket.on('notificaton' , (count) =>{
     counterEle.innerHTML = count
     // socket.emit('zero')

})



socket.on('test', message => {
     console.log(message , 'message');

})


counterEle.onclick = (e) =>{
     counterEle.innerHTML = 0
     socket.emit('zero')
}


// socket.emit('test_1', 'hello from the client side')