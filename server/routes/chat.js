const express = require('express')
const router = express.Router()

//Start path is /chat
router.get("/", (req, res) => {
    res.sendFile("/client/chat.html", {root: `${__dirname}/../../`})
})

module.exports = router