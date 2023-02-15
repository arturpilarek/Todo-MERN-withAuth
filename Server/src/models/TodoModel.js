const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    text: {
        type:String,
        required: true
    },
    priority: {
        type:Boolean
    },
    completed: {
        type:Boolean
    },
    dateAdded: {
        type: Date
    },
    deadline: {
        type: Date,
    },
    user_id: {
        type: String,
        required: true
    }
})

const TodoModel = mongoose.model('todo', todoSchema)

module.exports = TodoModel
