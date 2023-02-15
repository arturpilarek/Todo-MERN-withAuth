const TodoModel = require('../../models/TodoModel')

module.exports = async (req, res) => {
    const {id} = req.params
    const todo = await TodoModel.findOneAndUpdate({_id:id}, {
        ...req.body
    })
    res.status(200).json(todo)
}