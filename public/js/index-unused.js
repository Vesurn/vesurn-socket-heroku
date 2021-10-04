
const socket = io()


const messageInput = document.getElementById('messageInput')
const sendMessage = document.getElementById('sendMessage')
const roomInput = document.getElementById('roomInput')
const joinRoom = document.getElementById('joinRoom')
const chatWindow = document.getElementById('chatWindow')
const usernameInput = document.getElementById('username')
const usernameButton = document.getElementById('usernameButton')

usernameButton.addEventListener("click", (e) => {
    e.preventDefault()
    socket.emit('myName', usernameInput.value)

})

joinRoom.addEventListener("click", (e) => {
    e.preventDefault()
    socket.emit('joinRoom', roomInput.value)
    displayMessage(`You joined ${roomInput.value}`)
})

function displayMessage(message) {
    let div = document.createElement('div')
    div.innerHTML = message
    chatWindow.appendChild(div)
}

sendMessage.addEventListener('click', (e) => {
    e.preventDefault()
    displayMessage('YOU: ' + messageInput.value)
    socket.emit('sendMessage', messageInput.value)
})

socket.on('joinedMyRoom', (name, room) => {
    displayMessage(`${name} joined room: ${room}`)
})

socket.on('userJoined', (id) => {
    displayMessage(`Welcome user: ${id}`)
    console.log("Connected")
})

socket.on('userDisconnected', (id) => {
    displayMessage(`User left: ${id}`)
})

socket.on("receiveMessage", (name, msg) => displayMessage(`${name}: ${msg}`))