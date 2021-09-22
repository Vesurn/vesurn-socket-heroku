const express = require('express')
const router = express.Router()

//Start path is /chat
router.get("/", (req, res) => {
    res.render("chat", {username: req.query.u})
})

module.exports = router