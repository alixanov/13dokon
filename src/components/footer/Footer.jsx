     import React from 'react';
     import { Link } from 'react-router-dom';
     import "./footer.css";
     import document from "../../assets/photo_2023-12-14_18-38-55.jpg";

     const Footer = () => {
          return (
               <footer className='footer__container'>
                    <div className="footer__section">
                         <div className="footer__links">
                              <h4>Полезные ссылки</h4>
                              <Link to="/">Главная</Link>
                              <Link to="/catalog">Каталог продуктов</Link>
                              <Link to="/terms-of-service">Условия использования</Link>
                              <Link to="/refund-policy">Политика возврата</Link>
                         </div>
                    </div>
                    <div className="footer__section">
                         <div className="footer__contacts">
                              <h4>Контакты</h4>
                              <a href='tel:+998940751313'>Телефон: +99894 075 13 13</a>
                              <p>Email: alixonovshukurullo13@gmail.com</p>
                         </div>
                         <div className="footer__social-media">
                              <a href="https://t.me/alikhanov13">Telegram</a>
                              <a href="https://www.instagram.com/alikhanov.13/">Instagram</a>
                         </div>
                    </div>
                    <div className="footer__section">
                         <div className="footer__company-info">
                              <h4>О компании</h4>
                              <p>ООО ALIXANOV-IT GROUP — продажа авторских игрушек ручной работы для детей. Уникальность, качество и внимание к деталям. Широкий ассортимент и доступные условия покупки.</p>                       
                              <a
                                   // href={document} download="photo_2023-12-14_18-38-55.jpg"
                                   className="download-button"
                              >
                                   Скачать документ
                              </a>
                         </div>
                    </div>
               </footer>
          );
     };

     export default Footer;
