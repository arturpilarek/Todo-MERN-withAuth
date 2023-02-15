export default (token, userId, todo) => {
    return fetch(`${import.meta.env.VITE_API_URL}/todos/create`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            text: todo.text,
            priority: todo.priority,
            completed: false,
            user_id: userId
        })
    })
        .then(response => response.json())
}