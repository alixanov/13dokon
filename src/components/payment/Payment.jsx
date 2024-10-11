import React, { useState, useEffect } from 'react';
import './payemnt.css';

const Payment = () => {
     const [cardNumber, setCardNumber] = useState('');
     const [expiryDate, setExpiryDate] = useState('');
     const [cvc, setCvc] = useState('');
     const [totalPrice, setTotalPrice] = useState(0);

     useEffect(() => {
          const storedTotalPrice = localStorage.getItem('totalPrice');
          if (storedTotalPrice) {
               setTotalPrice(storedTotalPrice);
          }
     }, []);

     const handleCardNumberChange = (e) => {
          const value = e.target.value.replace(/\D/g, '');
          if (value.length <= 16) {
               setCardNumber(value.replace(/(.{4})/g, '$1 '));
          }
     };

     const handleExpiryDateChange = (e) => {
          const value = e.target.value.replace(/\D/g, '');
          if (value.length <= 4) {
               setExpiryDate(value.replace(/(\d{2})(\d{2})/, '$1/$2'));
          }
     };

     const handleCvcChange = (e) => {
          const value = e.target.value.replace(/\D/g, '');
          if (value.length <= 3) {
               setCvc(value);
          }
     };

     return (
          <div className="payment-container">
               <p className="payment-summary">Итого к оплате: {totalPrice} $</p>

               <form className="payment-form">
                    <label>
                         Номер карты
                         <input
                              type="text"
                              value={cardNumber}
                              onChange={handleCardNumberChange}
                              placeholder="XXXX XXXX XXXX XXXX"
                         />
                    </label>
                    <label>
                         Срок действия
                         <input
                              type="text"
                              value={expiryDate}
                              onChange={handleExpiryDateChange}
                              placeholder="MM/YY"
                         />
                    </label>
                    <label>
                         CVC
                         <input
                              type="text"
                              value={cvc}
                              onChange={handleCvcChange}
                              placeholder="XXX"
                         />
                    </label>
                    <button type="submit" className="payment-button">
                         Оплатить
                    </button>
               </form>
          </div>
     );
};

export default Payment;