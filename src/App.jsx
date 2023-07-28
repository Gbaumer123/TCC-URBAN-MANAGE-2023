import './App.css'
import { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

import AppRoutes from './router/AppRoutes';




function App() {
    return(
        <div>
            <AppRoutes />
        </div>
    )
}

export default App



