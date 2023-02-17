export default (username, password) => {
    return fetch(`${import.meta.env.VITE_API_URL}/login`, {
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
            //We use if statement here to be sure we are returning response only when response is ok
            if (response.ok) {
                return response.json()
            } else {
                throw new Error ('Login failed')
            }
        })
}