const express = require('express')

const tokenAuth = require('./middleware/tokenAuth')

//User
const userRegisterRoute = require('./routes/user/userRegisterRoute')
const userLoginRoute = require('./routes/user/userLoginRoute')

//Todos
const createTodoRoute = require('./routes/todos/createTodoRoute')
const readTodosRoute = require('./routes/todos/readTodosRoute')
const deleteTodoRoute = require('./routes/todos/deleteTodoRoute')
const updateTodoRoute = require('./routes/todos/updateTodoRoute')

const router = express.Router()

//User routes
router.post('/register', userRegisterRoute)
router.post('/login', userLoginRoute)

//Todos routes
router.post('/todos/get', tokenAuth, readTodosRoute)
router.post('/todos/create',tokenAuth, createTodoRoute)
router.put('/todos/:id',tokenAuth, updateTodoRoute)
router.delete('/todos/:id',tokenAuth, deleteTodoRoute)

module.exports = router