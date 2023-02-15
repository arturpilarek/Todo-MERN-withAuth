const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const router = require('./router')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.use(router)

mongoose.connect(process.env.MONGO_ENDPOINT).then(() => {
    console.log('server connected, port8081')
    app.listen(8081)
})