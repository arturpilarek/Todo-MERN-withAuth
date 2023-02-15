export default (todo, token) => {
    return fetch(`${import.meta.env.VITE_API_URL}/todos/${todo._id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            text: todo.text,
            completed: todo.completed,
            priority: todo.priority
        })
    })
        .then(response => response.json())
}