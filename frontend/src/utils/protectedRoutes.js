import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const userInfo = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null;

    // If userInfo is present, user is authenticated
    const isAuthenticated = !!userInfo;

    // If authorized, return an outlet that will render child elements
    // If not, navigate to the login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
