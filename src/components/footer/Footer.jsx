import React from 'react';
import { Link } from 'react-router-dom';
import "./footer.css";

const Footer = () => {
     return (
          <footer className='footer__container'>
               <div className="footer__section">
                    <div className="footer__company-info">
                         <h4>О компании</h4>
                         <p>ALIKHANOV DEV занимается разработкой веб-решений и продажей продуктов. Мы стремимся предоставлять качественные сервисы для наших клиентов.</p>
                    </div>
               </div>
               <div className="footer__section">
                    <div className="footer__links">
                         <h4>Полезные ссылки</h4>
                         <Link to="/">Главная</Link>
                         <Link to="/catalog">Каталог продуктов</Link>
                         <Link to="/terms-of-service">Условия использования</Link> {/* Добавлена ссылка на Условия использования */}
                         <Link to="/refund-policy">Политика возврата</Link> {/* Добавлена ссылка на Политику возврата */}
                    </div>
               </div>
               <div className="footer__section">
                    <div className="footer__contacts">
                         <h4>Контакты</h4>
                         <p>Телефон: +99894 075 13 13</p>
                         <p>Email: alixonovshukurullo13@gmail.com</p>
                         {/* <Link to="https://www.alikhanov.uz" target="_blank" rel="noopener noreferrer">Автор</Link> */}

                    </div>
                    <div className="footer__social-media">
                         <Link to="https://t.me/alikhanov13">Telegram</Link>
                         <Link to="https://www.instagram.com/alikhanov.13/">Instagram</Link>
                    </div>
               </div>
          </footer>
     );
};

export default Footer;
