import React, {useContext, useState} from "react";
import login from "../api/userRequests/login.js";
import { useNavigate, NavLink } from 'react-router-dom';
import {TokenContext, UserContext} from "../App.jsx";

export const LoginPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [token, setToken] = useContext(TokenContext)
    const [user, setUser] = useContext(UserContext)

    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        login(username, password)
            .then(({token, userData}) => {
                setUser(userData)
                setToken(token)
                navigate('/')
            })
            .catch(err => {
            setError(err.message)
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <div style={{color: 'red'}}>{error}</div>
            <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'}}>
                <label htmlFor="username-login">Username</label>
                <input style={{marginBottom: '12px'}} type="text" value={username} id="username-login" onChange={event => setUsername(event.target.value)}/>
                <label htmlFor="password-login">Password</label>
                <input  type="password" value={password} id="password-login" onChange={event => setPassword(event.target.value)}/>
                <button style={{marginBottom: '8px', marginTop: "8px"}}>Login</button>
            </form>
            <NavLink to="/register">Register</NavLink>
        </div>
    )
}