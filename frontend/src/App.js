import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainAppScreen from './screens/MainAppScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProtectedRoute from "./utils/protectedRoutes";

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/register" element={<RegisterScreen />} />
                    <Route path="/" element={<ProtectedRoute />}>
                        <Route path="/" element={<MainAppScreen />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
