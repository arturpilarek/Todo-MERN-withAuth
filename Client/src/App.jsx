import React, { useContext, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { RegisterPage } from './pages/RegisterPage'

export const TokenContext = React.createContext(null);

const ProtectedRoute = ({ element }) => {
    const [token] = useContext(TokenContext);
    return token ? element() : <Navigate to="/login" />;
};

function App() {
    const [token, setToken] = useState(null);

    return (
        <div className="App">
            {/*Context work in this way, that every component wrapped in this provider will have access to variables in value field*/}
            <TokenContext.Provider value={[token, setToken]}>
                <Routes>
                    <Route
                        path="/"
                        element={<ProtectedRoute element={MainPage} />}
                    />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Routes>
            </TokenContext.Provider>
        </div>
    );
}

export default App;