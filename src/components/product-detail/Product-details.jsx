import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./product-detail.css"

const ProductDetails = () => {
     const { id } = useParams();
     const [product, setProduct] = useState(null);

     useEffect(() => {
          axios.get(`https://13dokon-server.vercel.app/api/getone/${id}`)
               .then(response => setProduct(response.data))
               .catch(error => console.error('Ошибка при получении данных:', error));
     }, [id]);

     if (!product) {
          return <p>Загрузка...</p>;
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
                    <button className="buy-button">Покупать</button>
               </div>
          </div>
     );
};

export default ProductDetails;
