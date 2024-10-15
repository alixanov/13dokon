import React, { useState } from 'react';
import "../login/login.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // SweetAlert2 import
import { jwtDecode } from 'jwt-decode'; // Импортируем jwtDecode
import "./login.css"

const Login = () => {
     const [login, setLogin] = useState('');
     const [password, setPassword] = useState('');
     const navigate = useNavigate();

     const notifySuccess = (message) => {
          Swal.fire({
               icon: 'success',
               title: 'Успех!',
               text: message,
               timer: 3000,
               showConfirmButton: false,
          });
     };

     const notifyError = (message) => {
          Swal.fire({
               icon: 'error',
               title: 'Ошибка!',
               text: message,
               timer: 3000,
               showConfirmButton: false,
          });
     };

     const loginUser = async () => {
          if (!login || !password) {
               notifyError('Пожалуйста, заполните все поля.');
               return;
          }

          const data = { login, password };

          try {
               const res = await axios.post("https://13dokon-server.vercel.app/api/users/login", data, {
                    headers: {
                         'Content-Type': 'application/json',
                    }
               });

               const token = res.data.token;

               // Декодируем токен, чтобы получить userId
               const decodedToken = jwtDecode(token);
               const userId = decodedToken.id; // Извлекаем userId (в вашем случае он закодирован как 'id')

               // Сохраняем токен, userLogin и userId
               localStorage.setItem("token", token);
               localStorage.setItem("userLogin", login); // Сохраняем логин пользователя
               localStorage.setItem("userId", userId); // Сохраняем userId

               // Показываем уведомление перед навигацией
               notifySuccess("Вы успешно вошли в систему!");

               // Переход в кабинет пользователя
               navigate('/cabinet');
          } catch (error) {
               console.error("Ошибка:", error.response?.data || error.message);

               if (error.response?.status === 400) {
                    notifyError('Неверный логин или пароль.');
               } else {
                    notifyError('Произошла ошибка на сервере.');
               }
          }
     };

     return (
          <div className="login__container">
               <form className='login__form' onSubmit={(e) => { e.preventDefault(); loginUser(); }}>
                    <h2>Авторизация</h2>
                    <input
                         type="text"
                         placeholder="Логин"
                         value={login}
                         onChange={(e) => setLogin(e.target.value)}
                    />
                    <input
                         type="password"
                         placeholder="Пароль"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Войти</button>
                    <Link to={"/register"}>Регистрация</Link>
               </form>
          </div>
     );
};

export default Login;
