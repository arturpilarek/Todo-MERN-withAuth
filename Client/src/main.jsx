import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/*query to get access to react query methods*/}
            {/*you need to wrap app component in browser router to get access to router methods*/}
            <BrowserRouter>
                <App />
            </BrowserRouter>
    </React.StrictMode>
);