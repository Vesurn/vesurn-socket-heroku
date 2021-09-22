const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const PORT = process.env.PORT || 8080

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

app.use(function(req, res, next) {
    console.log(req.method + ' ' + req.url)
    next()
}
)
app.use(express.static("./public"))

app.get('/', (req, res) => {
    res.sendFile('/client/index.html', {root: `${__dirname}/../`})
})

/* Express routes */
const loginRoute = require('./routes/login')
app.use('/login', loginRoute)


/* Socket.io  */
function onConnection(socket) {
    console.log("Connected " + socket.id)
}

io.on("connection", onConnection)

