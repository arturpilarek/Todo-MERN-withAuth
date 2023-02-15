import React, {useContext, useEffect, useState} from "react";
import {TokenContext, UserContext} from "../App.jsx";
import readTasks from "../api/taskRequests/readTasks.js";
import ClipLoader from "react-spinners/ClipLoader.js";

export const MainPage = () => {
    const [token] = useContext(TokenContext)
    const [user] = useContext(UserContext)

    const [todos, setTodos] = useState([])
    const [loadingSpinner, setLoadingSpinner] = useState(true)

    useEffect(() => {
        readTasks(token, user.user_id).then(allTodos => {
            setTodos(allTodos)
            setLoadingSpinner(false)
        })
    }, [])

    return (
        <div>
            <h2>MERN Todo</h2>
            <p>{user.displayName}</p>
            {loadingSpinner
                ? (<ClipLoader size={150}/>)
                // : (<TodoItem todo={todos} key={todos._id}/>)
                : todos.length === 0
                    ? <p>No tasks, maybe create one?</p>
                    : todos.map(todo => <p key={todo._id}>{todo.text}</p>)
            }
        </div>
    )
}

