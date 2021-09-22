const express = require('express')
const router = express.Router()

//The start path is "/login"
router.get('/', (req, res) => {
    console.log(req.query)
    res.json(req.query)
})
module.exports = router