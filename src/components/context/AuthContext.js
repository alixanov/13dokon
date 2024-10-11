// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
     const [isAuthenticated, setIsAuthenticated] = useState(false);
     const [userLogin, setUserLogin] = useState('');

     useEffect(() => {
          const token = localStorage.getItem('token');
          const login = localStorage.getItem('userLogin');
          if (token && login) {
               setIsAuthenticated(true); // Если токен и логин существуют, пользователь авторизован
               setUserLogin(login);
          } else {
               setIsAuthenticated(false);
          }
     }, []); // Запускается при первом рендере

     const login = (token, login) => {
          localStorage.setItem('token', token);
          localStorage.setItem('userLogin', login);
          setIsAuthenticated(true);
          setUserLogin(login);
     };

     const logout = () => {
          localStorage.removeItem('token');
          localStorage.removeItem('userLogin');
          setIsAuthenticated(false);
          setUserLogin('');
     };

     return (
          <AuthContext.Provider value={{ isAuthenticated, userLogin, login, logout }}>
               {children}
          </AuthContext.Provider>
     );
};
