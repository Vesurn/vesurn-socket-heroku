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

app.use(logger)

app.get('/', (req, res) => {
    res.sendFile('/client/index.html', {root: `${__dirname}/../`})
})

const loginRoute = require('./routes/login')
app.use('/login', loginRoute)

/* app.get('/client/index.js', (req, res) => {
    res.sendFile('/client/index.js', {root: `${__dirname}/../`})
}) */
app.use(express.static("./public"))

function logger(req, res, next) {
    console.log(req.method + ' ' + req.url)
    next()
}


io.on("connection", (socket) => {

})

