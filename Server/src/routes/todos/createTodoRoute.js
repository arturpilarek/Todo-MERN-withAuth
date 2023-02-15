const TodoModel = require('../../models/TodoModel')

module.exports = async (req, res) => {
    const {text, user_id, priority} = req.body
    console.log(text, user_id)
    const todo = new TodoModel({
        text,
        priority,
        completed: false,
        dateAdded: new Date(),
        user_id
    })
    const newTodo = await todo.save()
    res.json(newTodo)
}
