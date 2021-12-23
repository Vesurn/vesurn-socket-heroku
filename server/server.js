const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const PORT = process.env.PORT || 8080
const ROOT = `${__dirname}/../`
server.listen(PORT, () => {
    console.log(`Server active on http://localhost:${PORT}`)
})
app.set("view engine", "ejs")

app.use(function(req, res, next) {
    console.log(req.method + ' ' + req.url)
    next()
})
app.use(express.static("./public"))
app.use(express.json())

/* Root directory */
app.get('/', (req, res) => {
    res.sendFile('/client/index.html', {root: ROOT})
})

app.get("/manifest.webmanifest", (req, res) => {
    res.sendFile("/manifest.webmanifest", {root: ROOT})
})
app.get("/favicon.ico", (req, res) => {
    res.sendFile("/public/images/VSRN1920x1920.png", {root: ROOT})
})
app.get("/sw.js", (req, res) => {
    res.sendFile("/public/js/sw.js", {root: ROOT})
})
/* Express routes */
const loginRoute = require('./routes/login')
app.use('/login', loginRoute)

const chatRoute = require('./routes/chat')
app.use('/chat', chatRoute)

/* Database map of Doom */
const db = new Map()
const online = {}
/* Socket.io  */
function onConnection(socket) {
    console.log("Connected socket.id= " + socket.id)
    socket.emit("connected", online)
    socket.join("GLOBAL")

    socket.on("user joined", user => {
        socket.broadcast.emit("user joined", user, socket.id)
        console.log("user joined" + JSON.stringify(user))
        online[socket.id] = user
    })
    socket.on("join room", room => {

    })

    socket.on("chat message", (message, room) => {
        message.sentbyme = !message.sentbyme
        socket.to(room).emit("chat message", message)
    })


    socket.on("disconnect", (reason) => {
        console.log(`Disconnected ${socket.id} ${reason}`)
        socket.broadcast.emit("user disconnected", online[socket.id])
        delete online[socket.id]
    })
}

io.on("connection", onConnection)

