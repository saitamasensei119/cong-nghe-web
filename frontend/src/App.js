import "antd/dist/reset.css";
import "./pages/global.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Layout/Navbar/Navbar";
import Footer from "./components/Layout/Footer/Footer";
import { UserProvider } from "./contexts/UserContext";
import AppRoutes from "./routes/Index";
import { jwtDecode } from "jwt-decode";

function AppContent() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  const isHomePage = location.pathname === "/";

  return (
    <div
      className={`page-layout ${
        isAuthPage ? "login-page" : isHomePage ? "home-page" : ""
      }`}
    >
      {/* Ẩn Navbar trên trang login và register, hiển thị ở trang khác */}
      {!isAuthPage && !isHomePage && <Navbar />}
      <main className="content main-content">
        <Routes>{AppRoutes()}</Routes>
      </main>
      {/* Nếu cần Footer, có thể bật lại */}
      {/* <Footer /> */}
    </div>
  );
}

function App() {
  // Quản lý user token trong context hoặc local state ở đây nếu muốn,
  // hoặc để UserProvider làm việc này (tùy cách bạn triển khai context)
  // Nếu muốn lấy user từ token ở đây, có thể xử lý trong UserProvider

  return (
    <Router>
      <UserProvider>
        <AppContent />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </UserProvider>
    </Router>
  );
}

export default App;
