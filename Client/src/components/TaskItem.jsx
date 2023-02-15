import React from "react";

export const TaskItem = ({todo}) => {

    console.log(todo)

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <input type="checkbox" checked={todo.completed} />
            <input style={{height: 'min-content'}} type="text" value={todo.text}/>
            <p>{todo.priority ? 'Priority' : 'No priority'}</p>
            <button>Delete</button>
        </div>
    )
}