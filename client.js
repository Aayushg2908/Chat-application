const socket = io('http://localhost:8000');

const form = document.querySelector(".form");
const messInput = document.querySelector(".input");
const messContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');
const append = (message, position)=>{
    const messElement = document.createElement('div');
    messElement.innerText = message;
    messElement.classList.add('message');
    messElement.classList.add(position);
    messContainer.append(messElement);
    if(position == 'left'){
        audio.play();
    }
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message =messInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messInput.value = '';
})
const names = prompt("Enter your name to join");
socket.emit('new-user-joined', names);
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right');
})
socket.on('recieve', data =>{
    append(`${data.name}: ${data.message}`, 'left');
})
socket.on('left', name =>{
    append(`${name} left the chat`, 'left');
})