import React, { useState, useEffect } from 'react';
import './cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
     const navigate = useNavigate()
     const [cart, setCart] = useState(() => {
          const savedCart = localStorage.getItem('cart');
          return savedCart ? JSON.parse(savedCart).map(item => ({ ...item, quantity: item.quantity || 1 })) : [];
     });

     // Функция для удаления товара из корзины
     const removeFromCart = (index) => {
          const newCart = cart.filter((_, i) => i !== index);
          setCart(newCart);
     };

     // Функция для очистки корзины
     const clearCart = () => {
          const totalPrice = getTotalPrice();
          localStorage.setItem('totalPrice', totalPrice); // сохраняем итоговую сумму
          setCart([]);
          navigate("/payment");
     };

     // Сохранение корзины в localStorage при изменении
     useEffect(() => {
          localStorage.setItem('cart', JSON.stringify(cart));
     }, [cart]);

     // Функция для расчета общей стоимости товаров в корзине
     const getTotalPrice = () => {
          return cart.reduce((total, item) => total + item.narxi * item.quantity, 0);
     };

     // Функция для увеличения количества товара
     const plus = (index) => {
          const updatedCart = cart.map((item, i) => {
               if (i === index) {
                    return { ...item, quantity: item.quantity + 1 };
               }
               return item;
          });
          setCart(updatedCart);
     };

     // Функция для уменьшения количества товара
     const minus = (index) => {
          const updatedCart = cart.map((item, i) => {
               if (i === index && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
               }
               return item;
          });
          setCart(updatedCart);
     };

     return (
          <div className='cart__container'>
               <h2>Ваша корзина</h2>
               {cart.length > 0 ? (
                    <div className='cart__wrapper'>
                         <div className="cart__items-left">
                              {cart.map((item, index) => (
                                   <div key={index} className="cart__item">
                                        <img src={item.rasm} alt={item.nomi} className="cart__image" />
                                        <div className="cart__info">
                                             <p>{item.nomi}</p>
                                             <span>{item.narxi} $</span>
                                             <p>{item.malumoti}</p>
                                             <div className="cart__control-inc-dec">
                                                  <button onClick={() => minus(index)}>-</button>
                                                  <p>{item.quantity}</p> {/* Отображение количества */}
                                                  <button onClick={() => plus(index)}>+</button>
                                             </div>
                                             <div className="cart__controls">
                                                  <button onClick={() => removeFromCart(index)}>Удалить</button>
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>

                         <div className="cart__items-right">
                              <div className="cart__summary">
                                   Итого: <span>{getTotalPrice()} $</span> {/* Отображение итоговой суммы */}
                              </div>

                              <button className="cart__checkout-btn" onClick={clearCart} >
                                   Оформить заказ
                              </button>
                         </div>
                    </div>
               ) : (
                    <p>Корзина пуста</p>
               )}
          </div>
     );
};

export default Cart;
