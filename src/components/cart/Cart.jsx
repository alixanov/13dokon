import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './cart.css';

const Cart = () => {
     const navigate = useNavigate();
     const [cart, setCart] = useState(() => {
          const savedCart = localStorage.getItem('cart');
          return savedCart ? JSON.parse(savedCart).map(item => ({ ...item, quantity: item.quantity || 1 })) : [];
     });

     const removeFromCart = (index) => {
          const newCart = cart.filter((_, i) => i !== index);
          setCart(newCart);
     };

     const clearCart = () => {
          const totalPrice = getTotalPrice();
          localStorage.setItem('totalPrice', totalPrice);
          setCart([]);
          navigate("/payment");
     };

     useEffect(() => {
          localStorage.setItem('cart', JSON.stringify(cart));
     }, [cart]);

     const getTotalPrice = () => {
          return cart.reduce((total, item) => total + item.narxi * item.quantity, 0);
     };

     const plus = (index) => {
          const updatedCart = cart.map((item, i) => {
               if (i === index) {
                    return { ...item, quantity: item.quantity + 1 };
               }
               return item;
          });
          setCart(updatedCart);
     };

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
                                   <Link
                                        to={`/product/${item._id}`}
                                        key={index}
                                        className="cart__item"
                                   >
                                        <img src={item.rasm} alt={item.nomi} className="cart__image" />
                                        <div className="cart__info">
                                             <p>{item.nomi}</p>
                                             <span>{item.narxi} $</span>
                                             <p>{item.malumoti}</p>
                                             <div className="cart__control-inc-dec">
                                                  <button onClick={(e) => { e.stopPropagation(); minus(index); }}>-</button>
                                                  <p>{item.quantity}</p>
                                                  <button onClick={(e) => { e.stopPropagation(); plus(index); }}>+</button>
                                             </div>
                                             <div className="cart__controls">
                                                  <button onClick={(e) => { e.stopPropagation(); removeFromCart(index); }}>Удалить</button>
                                             </div>
                                        </div>
                                   </Link>
                              ))}
                         </div>
                         <div className="cart__items-right">
                              <div className="cart__summary-items">
                                   {cart.map((item, index) => (
                                        <div key={index} className="cart__summary-item">
                                             <span>{item.nomi}:</span>
                                             <span>{item.narxi * item.quantity} $</span>
                                        </div>
                                   ))}
                              </div>
                              <div className="cart__summary-total">
                                   Итого: <span>{getTotalPrice()} $</span>
                              </div>
                              <button className="cart__checkout-btn" onClick={clearCart}>
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