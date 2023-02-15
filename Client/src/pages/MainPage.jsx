import React, {useContext, useEffect, useState} from "react";
import {TokenContext, UserContext} from "../App.jsx";
import readTasks from "../api/taskRequests/readTasks.js";
import ClipLoader from "react-spinners/ClipLoader.js";
import {TaskItem} from "../components/TaskItem.jsx";
import {CreateNewTask} from "../components/CreateNewTask.jsx";
import {useQuery} from "react-query";

export const MainPage = () => {
    const [token] = useContext(TokenContext)
    const [user] = useContext(UserContext)

    // const [todos, setTodos] = useState([])
    // const [loadingSpinner, setLoadingSpinner] = useState(true)

    const {isLoading, data: todos} = useQuery('todos', () => readTasks(token, user.user_id), {
        onSettled: () => {
            console.log(todos)
        }
    })

    //Alternatively I could use useEffect here
    // useEffect(() => {
    //     readTasks(token, user.user_id).then(allTodos => {
    //         setTodos(allTodos)
    //         setLoadingSpinner(false)
    //     })
    // }, [])

    return (
        <div>
            <h2>MERN Todo</h2>
            <p>{user.displayName}</p>
            {isLoading
                ? (<ClipLoader size={150}/>)
                : todos.length === 0
                    ? <p>No tasks, maybe create one?</p>
                    : todos.map(todo => <TaskItem key={todo._id} todo={todo} />)
            }
            <CreateNewTask />
        </div>
    )
}

