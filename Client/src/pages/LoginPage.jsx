import React, {useContext, useState} from "react";
import login from "../api/login.js";
import { useNavigate, NavLink } from 'react-router-dom';
import {TokenContext} from "../App.jsx";

export const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [token, setToken] = useContext(TokenContext)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        login(email, password)
            .then(({token}) => {
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
            <form onSubmit={handleLogin}>
                <input type="text" value={email} onChange={event => setEmail(event.target.value)}/>
                <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                <button>Login</button>
            </form>
            <NavLink to="/register">Register</NavLink>
        </div>
    )
}