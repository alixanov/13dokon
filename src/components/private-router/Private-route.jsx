// src/components/private-router/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Подключаем контекст

const PrivateRoute = ({ children }) => {
     const { isAuthenticated } = useContext(AuthContext); // Используем состояние авторизации

     return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
