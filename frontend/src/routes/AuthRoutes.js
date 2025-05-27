import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';

const AuthRoutes = ({ user, onLogin }) => ([
    <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage onLogin={onLogin} />} key="login" />,
    <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} key="register" />,
]);

export default AuthRoutes;