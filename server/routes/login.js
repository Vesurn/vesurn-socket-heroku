const express = require('express')
const router = express.Router()

//The start path is "/login"
router.get('/', (req, res) => {
    res.redirect(`/chat?u=${req.query.username}`)
})

module.exports = router