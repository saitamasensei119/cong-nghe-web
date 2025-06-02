import "antd/dist/reset.css";
import "./pages/global.css";
import React from "react";
import { BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Layout/Navbar/Navbar";
import { UserProvider } from "./contexts/UserContext";
import AppRoutes from "./routes/Index";

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const isHomePage = location.pathname === "/";

  return (
    <div className={`page-layout ${isAuthPage ? 'login-page' : isHomePage ? 'home-page' : ''}`}>
      {!isAuthPage && !isHomePage && <Navbar />}
      <main className="content main-content">
        <Routes>
          {AppRoutes()}
        </Routes>
      </main>
      {/*<Footer />*/}
    </div>
  );
}

function App() {
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
