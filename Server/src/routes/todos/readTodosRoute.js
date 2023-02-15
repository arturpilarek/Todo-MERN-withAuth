const TodoModel = require('../../models/TodoModel')

module.exports = async (req, res) => {
    const {user_id} = req.body
    const todos = await TodoModel.find({user_id})
    res.json(todos)
}