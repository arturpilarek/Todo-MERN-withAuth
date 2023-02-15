import React, {useContext} from "react";
import {useMutation, useQueryClient} from "react-query";
import deleteTask from "../api/taskRequests/deleteTask.js";
import {TokenContext} from "../App.jsx";

export const TaskItem = ({todo}) => {

    const [token] = useContext(TokenContext)

    const queryClient = useQueryClient()

    const {mutate: deleteTodo} = useMutation((deletedTodo) => deleteTask(deletedTodo, token),{
        onSettled: () => {
            //All queries with todos query key will refetch data
            queryClient.invalidateQueries('todos')
        }
    })

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <input type="checkbox" checked={todo.completed} />
            <input style={{height: 'min-content'}} type="text" value={todo.text}/>
            <p>{todo.priority ? 'Priority' : 'No priority'}</p>
            <button onClick={() => deleteTodo(todo)}>Delete</button>
        </div>
    )
}