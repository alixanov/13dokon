import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./catalog.css";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    fetch('https://13dokon-server.vercel.app/api/getall')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Ошибка:', error));
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const productTypes = [...new Set(products.map(product => product.turi))];

  const getIconForType = (type) => {
    const product = products.find(product => product.turi === type);
    return product ? product.icon : '';
  };

  const filteredProducts = selectedType
    ? products.filter(product => product.turi === selectedType)
    : products;

  return (
    <div className='catalog__container'>
      <div className="catalog__left-card">
        <ul>
          {productTypes.map((type, index) => (
            <li
              key={index}
              onClick={() => setSelectedType(type)}
              className={selectedType === type ? 'active' : ''}
            >
              <img src={getIconForType(type)} alt={type} className="type-icon" />
              {capitalizeFirstLetter(type)}
            </li>
          ))}
        </ul>
      </div>

      <div className="catalog__right-card">
        <ul>
          {filteredProducts.map(product => (
            <li key={product._id}>
              <Link to={`/product/${product._id}`} className="product-link">
                {capitalizeFirstLetter(product.nomi)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Catalog;
