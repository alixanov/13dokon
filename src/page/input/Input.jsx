import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import './input.css';

const Input = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Текущий запрос
  const [products, setProducts] = useState([]); // Список продуктов
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

  useEffect(() => {
    if (searchTerm.length > 0) {
      // Запрос к серверу только при наличии текста
      const fetchProducts = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`http://localhost:8080/api/getall?search=${searchTerm}`);
          const data = await response.json();
          const filteredData = data.filter(product =>
            product.nomi.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setProducts(filteredData); // Обновляем список продуктов
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
        setIsLoading(false);
      };

      fetchProducts();
    } else {
      setProducts([]); // Очищаем список, если поле пустое
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value); // Обновляем поисковый запрос
  };

  const handleProductClick = () => {
    setSearchTerm(''); // Очищаем строку поиска после выбора продукта
    setProducts([]); // Очищаем список продуктов
  };

  return (
    <div className='input__container'>
      <input
        type="text"
        placeholder='Искать товары и категории'
        value={searchTerm}
        onChange={handleInputChange}
      />
      {/* <button>
        <SearchIcon sx={{ color: "darkred" }} />
      </button> */}

      {/* Отображаем результаты поиска */}
      <ul className='product-list'>
        {products.map((item) => (
          <li key={item._id}>
            {/* Используем Link для открытия страницы продукта и очищаем результаты */}
            <Link to={`/product/${item._id}`} onClick={handleProductClick}>
              <p>{item.nomi}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Input;
