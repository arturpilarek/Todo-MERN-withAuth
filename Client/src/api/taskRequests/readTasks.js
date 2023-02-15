export default (token, userId) => {
    return fetch(`${import.meta.env.VITE_API_URL}/todos/get`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            user_id: userId
        })
    })
        .then(response => {
            return response.json()
        })
}