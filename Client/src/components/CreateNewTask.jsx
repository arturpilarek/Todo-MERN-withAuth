import React, {useContext, useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import createNewTask from "../api/taskRequests/createNewTask.js";
import {TokenContext, UserContext} from "../App.jsx";

export const CreateNewTask = () => {

    const [token] = useContext(TokenContext)
    const [user] = useContext(UserContext)

    const [text, setText] = useState("")
    const [priority, setPriority] = useState(false)

    const queryClient = useQueryClient()

    const {mutate: createTodo} = useMutation((createdTodo) => createNewTask(token, user.user_id, createdTodo),{
        onSettled: () => {
            queryClient.invalidateQueries('todos')
            setText("")
            setPriority(false)
        }
    })
    return (
        <div>
            <h3>Create new task</h3>
            <form onSubmit={(e) => {
                e.preventDefault()
                if(!text) return
                createTodo({
                    text,
                    priority
                })
            }}>

                <label htmlFor="todo-text">Text</label>
                <input id="todo-text" type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <label htmlFor="todo-priority">Priority</label>
                <input id="todo-priority" type="checkbox" checked={priority} onChange={(e) => setPriority(e.target.checked)}/>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}