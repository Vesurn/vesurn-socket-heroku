const express = require('express')
const router = express.Router()

//The start path is "/login"
router.get('/', (req, res) => {
    res.redirect('/chat')
})
router.post('/', (req, res) => {
    res.json({username: req.body.username, id: 1})
})
module.exports = router