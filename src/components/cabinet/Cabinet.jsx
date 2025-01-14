import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./cabinet.css"; // Подключение стилей

const Cabinet = () => {
     const [userLogin, setUserLogin] = useState('');
     const navigate = useNavigate();

     useEffect(() => {
          const token = localStorage.getItem("token");
          const login = localStorage.getItem("userLogin");

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
               <nav className="cabinet__navbar">
                    <p>Личный кабинет</p>
                    <button onClick={logout}>Выйти</button>
               </nav>
               <div className="cabinet__content">
                    <h2>Добро пожаловать, {userLogin}!</h2>
                    <div className="cabinet__cards">
                    
                         {/* Добавьте больше карточек по необходимости */}
                    </div>
               </div>
          </div>
     );
};

export default Cabinet;
