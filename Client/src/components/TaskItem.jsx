import React, {useCallback, useContext, useEffect, useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import deleteTask from "../api/taskRequests/deleteTask.js";
import {TokenContext} from "../App.jsx";
import updateTask from "../api/taskRequests/updateTask.js";
import {debounce} from "lodash";

export const TaskItem = ({todo}) => {

    const [token] = useContext(TokenContext)

    const [text, setText] = useState(todo.text)

    const queryClient = useQueryClient()

    const {mutate: deleteTodo} = useMutation((deletedTodo) => deleteTask(deletedTodo, token),{
        onSettled: () => {
            //All queries with todos query key will refetch data
            queryClient.invalidateQueries('todos')
        }
    })

    const {mutate: updateTodo} = useMutation((updatedTodo) => updateTask(updatedTodo, token),{
        onSettled: () => {
            queryClient.invalidateQueries('todos')
        }
    })

    //To avoid refetching data every time user types a new character we're setting debounce on text change
    const debouncedUpdateTodo = useCallback(
        debounce(updateTodo, 600),
        [updateTodo]
    );

    //Then when text is not the same like its orginal state we are commiting mutation and refetch stuff
    useEffect(() => {
        if (text !== todo.text) {
            debouncedUpdateTodo({
                ...todo,
                text,
            });
        }
    });

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <input type="checkbox" checked={todo.completed} onChange={() => { updateTodo({...todo, completed: !todo.completed}) }} />
            <input style={{height: 'min-content'}} type="text" value={text} onChange={(e) => setText(e.target.value)}/>
            <input type="checkbox" checked={todo.priority} onChange={() => { updateTodo({...todo, priority: !todo.priority}) }} />
            <p>{todo.priority ? 'Priority' : 'No priority'}</p>
            <button onClick={() => deleteTodo(todo)}>Delete</button>
        </div>
    )
}