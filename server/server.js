const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const PORT = process.env.PORT || 8080

server.listen(PORT, () => {
    console.log(`Server active on http://localhost:${PORT}`)
})
app.set("view engine", "ejs")

app.use(function(req, res, next) {
    console.log(req.method + ' ' + req.url)
    next()
}
)
app.use(express.static("./public"))
app.use(express.json())

/* Root directory */
app.get('/', (req, res) => {
    res.sendFile('/client/index.html', {root: `${__dirname}/../`})
})

/* Express routes */
const loginRoute = require('./routes/login')
app.use('/login', loginRoute)

const chatRoute = require('./routes/chat')
app.use('/chat', chatRoute)

/* Socket.io  */
function onConnection(socket) {
    console.log("Connected " + socket.id)
}

io.on("connection", onConnection)
