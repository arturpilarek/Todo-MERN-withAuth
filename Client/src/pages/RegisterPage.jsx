import React, {useContext, useState} from "react";
import register from "../api/userRequests/register.js";
import { useNavigate, NavLink } from 'react-router-dom';

export const RegisterPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        register(username, password)
            .then(() => {
                navigate('/login')
            })
            .catch(err => {
                setError(err.message)
            })
    }

    return (
        <div>
            <h1>Register</h1>
            <div style={{color: 'red'}}>{error}</div>
            <form onSubmit={handleRegister} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginBottom: '12px'}}>
                <label htmlFor="username-register">Username</label>
                <input id="username-register" type="text" value={username} onChange={event => setUsername(event.target.value)} style={{marginBottom: '12px'}}/>
                <label htmlFor="password-register">Password</label>
                <input id="password-register" type="password" value={password} onChange={event => setPassword(event.target.value)} style={{marginBottom: '12px'}}/>
                <button>Register</button>
            </form>
            <NavLink to="/login">Back to login</NavLink>
        </div>
    )
}