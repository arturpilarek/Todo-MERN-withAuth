export default (todo, token) => {
    return fetch(`${import.meta.env.VITE_API_URL}/todos/${todo._id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
    })
}