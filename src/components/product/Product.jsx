import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { message } from 'antd'; // Импортируем уведомления из Ant Design
import "./product.css";

// Настраиваем позицию уведомлений
message.config({
     top: document.documentElement.clientHeight - 60, // Высота экрана минус высота уведомления
     duration: 3,
     maxCount: 1,
     rtl: false,
     getContainer: () => document.body,
});

const Product = () => {
     const [data, setData] = useState([]);
     const navigate = useNavigate();
     const [cart, setCart] = useState(() => {
          const savedCart = localStorage.getItem('cart');
          return savedCart ? JSON.parse(savedCart) : [];
     });

     useEffect(() => {
          axios.get('https://13dokon-server.vercel.app/api/getall')
               .then(response => {
                    setData(response.data);
               })
               .catch(error => {
                    console.error('Ошибка при получении данных:', error);
               });
     }, []);

     useEffect(() => {
          localStorage.setItem('cart', JSON.stringify(cart));
     }, [cart]);

     const sendCart = async (item) => {
          const userId = localStorage.getItem('userId');

          if (!userId) {
               message.error({
                    content: "Пожалуйста, выполните вход.",
                    duration: 3,
                    style: { marginBottom: '20px', right: '10px', position: 'fixed' }
               });
               navigate('/login');
               return;
          }

          setCart(prevCart => [...prevCart, item]);

          try {
               const response = await axios.post('https://13dokon-server.vercel.app/api/cart/add', {
                    userId,
                    productId: item._id,
                    quantity: 1
               }, {
                    headers: {
                         'Authorization': `Bearer ${localStorage.getItem('token')}`,
                         'Content-Type': 'application/json'
                    }
               });

               message.success({
                    content: `${item.nomi} добавлен в корзину!`,
                    duration: 3,
                    style: { marginBottom: '20px', right: '10px', position: 'fixed' }
               });
          } catch (error) {
               console.error("Ошибка при добавлении товара в корзину:", error);
               message.error({
                    content: `Ошибка при добавлении ${item.nomi} в корзину.`,
                    duration: 3,
                    style: { marginBottom: '20px', right: '10px', position: 'fixed' }
               });
          }
     };

     return (
          <div className="product__big-container">
               <div className='product__container'>
                    {data.map((item) => (
                         <div className="product__card" key={item._id}>
                              <div className="product__image-container">
                                   <img src={item.rasm} alt={item.nomi} className="product-image" />
                              </div>
                              <div className="product__info">
                                   <h3 className="product__name">{item.nomi}</h3>
                                   <p className="product__quantity">В наличии: {item.soni} шт.</p>
                                   <p className="product__price">{item.narxi} $</p>
                                   <div className="product__actions">
                                        <button className="product__cart-button" onClick={() => sendCart(item)}>
                                             <LocalMallIcon
                                                  className="product__cart-icon"
                                                  sx={{
                                                       fontSize: {
                                                            xs: '15px',  // для экранов 480px и меньше
                                                            sm: '20px'  // для экранов больше 480px
                                                       }
                                                  }}
                                             /> В корзину
                                        </button>
                                        <Link to={`/product/${item._id}`} className="product__details-link">Подробнее</Link>
                                   </div>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default Product;
