import React from 'react';
import { useForm } from 'react-hook-form';
import "./registration.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd'; // Импортируем уведомления из Ant Design

const Registration = () => {
     const { register, handleSubmit, reset } = useForm();
     const navigate = useNavigate();

     const notifySuccess = (messageText) => {
          message.success({
               content: messageText,
               duration: 3,
          });
     };

     const notifyError = (messageText) => {
          message.error({
               content: messageText,
               duration: 3,
          });
     };

     const onSubmit = async (data) => {
          if (!data.login || !data.password) {
               notifyError("Заполните все поля!");
               return;
          }

          try {
               const response = await axios.post("https://13dokon-server.vercel.app/api/users/register", data, {
                    headers: {
                         'Content-Type': 'application/json',
                    }
               });
               console.log(response.data.message);
               notifySuccess("Вы успешно зарегистрировались!");
               reset();
               navigate("/"); // Перенаправление на страницу входа
          } catch (error) {
               console.error("Ошибка регистрации:", error.response?.data || error.message);
               if (error.response?.status === 400) {
                    notifyError("Этот логин уже используется.");
               } else {
                    notifyError("Произошла ошибка на сервере.");
               }
          }
     };

     return (
          <div className="registration__container">
               <form className="registration__form" onSubmit={handleSubmit(onSubmit)}>
                    <h2>Регистрация</h2>
                    <input type="text" placeholder="Логин" {...register("login", { required: true })} />
                    <input type="password" placeholder="Пароль" {...register("password", { required: true })} />
                    <button className='registration__button' type="submit">Отправить</button>
                    <div className="registration__reset">
                         <Link to={"/login"}>Уже есть аккаунт</Link>
                    </div>
               </form>
          </div>
     );
};

export default Registration;
