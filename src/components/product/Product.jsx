import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Snackbar from '@mui/material/Snackbar'; // Для уведомлений
import Alert from '@mui/material/Alert';
import "./product.css";

const Product = () => {
     const [data, setData] = useState([]);
     const navigate = useNavigate();
     const [cart, setCart] = useState(() => {
          // Загрузка корзины из localStorage при начальной загрузке
          const savedCart = localStorage.getItem('cart');
          return savedCart ? JSON.parse(savedCart) : [];
     });
     const [notification, setNotification] = useState({ open: false, message: '' });

     // Получаем список продуктов
     useEffect(() => {
          axios.get('https://13dokon-server.vercel.app/api/getall')
               .then(response => {
                    setData(response.data);
               })
               .catch(error => {
                    console.error('Ошибка при получении данных:', error);
               });
     }, []);

     // Сохранение корзины в localStorage при изменении
     useEffect(() => {
          localStorage.setItem('cart', JSON.stringify(cart));
     }, [cart]);

     const sendCart = async (item) => {
          const userId = localStorage.getItem('userId'); // Получаем userId из localStorage

          if (!userId) {
               console.error("Пользователь не авторизован.");
               setNotification({ open: true, message: "Пожалуйста, выполните вход." });
               navigate('/login');
               return;
          }

          // Добавляем товар в корзину
          setCart(prevCart => [...prevCart, item]);

          try {
               // Отправляем товар на сервер
               const response = await axios.post('https://13dokon-server.vercel.app/api/cart/add', {
                    userId, // Используем userId
                    productId: item._id,
                    quantity: 1
               }, {
                    headers: {
                         'Authorization': `Bearer ${localStorage.getItem('token')}`, // Передаем токен
                         'Content-Type': 'application/json'
                    }
               });

               console.log("Ответ сервера:", response.data);
               setNotification({ open: true, message: `${item.nomi} добавлен в корзину!` });

          } catch (error) {
               console.error("Ошибка при отправке товара на сервер:", error);
               setNotification({ open: true, message: `Ошибка при добавлении ${item.nomi} в корзину.` });
          }

          // Перенаправляем на другую страницу при необходимости
          navigate("/");
     };

     const handleCloseNotification = () => {
          setNotification({ ...notification, open: false });
     };

     return (
          <div className="product__big-container">
               <div className='product__container'>
                    {data.map((item) => (
                         <div className="product__card" key={item._id}>
                              <img src={item.rasm} alt={item.nomi} className="product-image" />
                              <div className="product__info">
                                   <p>{item.nomi}</p>
                                   <h4>{item.soni} количество</h4>
                                   <p>{item.narxi} $</p>
                                   <div className="product__cart-info">

                                        <div className="product__info-detail"
                                             onClick={() => sendCart(item)} // Отправляем товар в корзину и на сервер
                                        >
                                             <LocalMallIcon sx={{ color: "#019974", cursor: "pointer" }} />
                                             <Link >В корзину</Link>
                                        </div>
                                        <div className="product__cart-detail">
                                             <Link to={`/product/${item._id}`}>Подробнее</Link>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    ))}
               </div>

               {/* Уведомление о добавлении в корзину */}
               <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleCloseNotification}>
                    <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
                         {notification.message}
                    </Alert>
               </Snackbar>
          </div>
     );
}

export default Product;
