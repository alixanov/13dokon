import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cabinet = () => {
     const [userLogin, setUserLogin] = useState('');
     const navigate = useNavigate();

     useEffect(() => {
          const token = localStorage.getItem("token");
          const login = localStorage.getItem("userLogin");

          console.log("Проверка токена в Cabinet:", token); // Проверим, что токен существует
          console.log("Проверка логина в Cabinet:", login);

          if (!token || !login) {
               navigate('/login');
          } else {
               setUserLogin(login);
          }
     }, [navigate]);

     const logout = () => {
          localStorage.removeItem("token");
          localStorage.removeItem("userLogin");
          localStorage.removeItem("userId");
          navigate('/login');
     };

     return (
          <div className="cabinet__container">
               <h2>Добро пожаловать, {userLogin}!</h2>
               <button onClick={logout}>Выйти</button>
          </div>
     );
};

export default Cabinet;
