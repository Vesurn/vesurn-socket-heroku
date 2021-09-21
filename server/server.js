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

app.get('/login', (req, res) => {
    console.log(req.query)
    res.json(req.query)
})

app.get('/client/index.js', (req, res) => {
    res.sendFile('/client/index.js', {root: `${__dirname}/../`})
})

function logger(req, res, next) {
    console.log(req.method + ' ' + req.url)
    next()
}


io.on("connection", (socket) => {

})

