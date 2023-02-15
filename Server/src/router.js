const express = require('express')

const tokenAuth = require('./middleware/tokenAuth')
//User
const userRegisterRoute = require('./routes/user/userRegisterRoute')
const userLoginRoute = require('./routes/user/userLoginRoute')


const router = express.Router()

router.post('/register', userRegisterRoute)
router.post('/login', tokenAuth, userLoginRoute)


module.exports = router