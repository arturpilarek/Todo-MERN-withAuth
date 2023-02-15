const express = require('express')

const indexRoute = require('./routes/indexRoute')

const router = express.Router()

router.use('/', indexRoute)


module.exports = router