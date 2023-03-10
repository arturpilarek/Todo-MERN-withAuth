export default (username, password) => {
    return fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error ('Failed to create new user')
            }
        })
}