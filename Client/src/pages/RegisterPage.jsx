import React, {useContext, useState} from "react";
import register from "../api/register.js";
import { useNavigate, NavLink } from 'react-router-dom';

export const RegisterPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        register(email, password)
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
            <form onSubmit={handleRegister}>
                <input type="text" value={email} onChange={event => setEmail(event.target.value)}/>
                <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                <button>Register</button>
            </form>
            <NavLink to="/login">Back to login</NavLink>
        </div>
    )
}