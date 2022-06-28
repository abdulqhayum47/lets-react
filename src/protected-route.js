import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from './core/auth';
import MainShell from './modules/main/main-shell/main-shell';

function PrivateRoute() {
    const auth = Auth.isAuthenticated(); // determine if authorized, from context or however you're doing it

    // If authorized, return the private route that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <MainShell /> : <Navigate to="/auth/login" />;
}

export default PrivateRoute