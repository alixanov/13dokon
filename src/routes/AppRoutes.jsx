// src/AppRoutes.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "../components/navbar/Navbar";
import Home from '../components/home/Home';
import Catalog from "../components/catalog/Catalog";
import Product from '../components/product/Product';
import Login from '../components/login/Login';
import ProductDetails from '../components/product-detail/Product-details';
import Cart from '../components/cart/Cart';
import Registration from '../components/register/Registration';
import Cabinet from '../components/cabinet/Cabinet';
import PrivateRoute from '../components/private-router/Private-route';
import Payment from '../components/payment/Payment';
import { AuthProvider } from '../components/context/AuthContext'; // Подключаем провайдер
import Footer from '../components/footer/Footer';
import TermsOfService from '../components/footer/Terms';
import RefundPolicy from '../components/footer/Refund-policy';

const AppRoutes = () => {
  const location = useLocation();
  const hideNavFooterRoutes = ["/login", "/register"];

  return (
    <AuthProvider>
      {!hideNavFooterRoutes.includes(location.pathname) && <Navbar />}
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />

          {/* Защищаем страницу личного кабинета */}
          <Route
            path="/cabinet"
            element={
              <PrivateRoute>
                <Cabinet />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      {!hideNavFooterRoutes.includes(location.pathname) && <Footer />}
    </AuthProvider>
  );
};

export default AppRoutes;
