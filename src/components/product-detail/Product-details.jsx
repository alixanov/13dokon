import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircleLoader } from 'react-spinners';
import "./product-detail.css";

const ProductDetails = () => {
     const { id } = useParams();
     const navigate = useNavigate();
     const [product, setProduct] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          axios.get(`https://13dokon-server.vercel.app/api/getone/${id}`)
               .then(response => {
                    setProduct(response.data);
                    setLoading(false);
               })
               .catch(error => {
                    console.error('Ошибка при получении данных:', error);
                    setLoading(false);
               });
     }, [id]);

     const handleBuyClick = () => {
          localStorage.setItem('totalPrice', product.narxi);
          navigate('/payment');
     };

     if (loading) {
          return (
               <div className="loader-container">
                    <CircleLoader color="#00b894" size={50} />
                    {/* <p>Загрузка...</p> */}
               </div>
          );
     }

     if (!product) {
          return <p>Продукт не найден</p>;
     }

     return (
          <div className="product-details">
               <div className="product__detail-left">
                    <img src={product.rasm} alt={product.nomi} />
               </div>
               <div className="product__detail-right">
                    <h2>{product.nomi}</h2>
                    <p className="product-description">{product.malumoti}</p>
                    <div className="product-info">
                         <h4>{product.soni} остаток</h4>
                         <span>{product.narxi} $</span>
                    </div>
                    <button className="buy-button" onClick={handleBuyClick}>Покупать</button>
               </div>
          </div>
     );
};

export default ProductDetails;
