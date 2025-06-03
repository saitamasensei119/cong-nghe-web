import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userProfile, logout, isAuthenticated } = useUser();

  const currentUser = userProfile || user;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu on location change
  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [location]);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    logout();
    navigate("/login");
  };

  const getUserDisplayName = () => {
    if (currentUser?.fullname) return currentUser.fullname;
    if (currentUser?.username) return currentUser.username;
    if (currentUser?.sub) return currentUser.sub;
    return "User";
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div
          className="logo"
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        >
          <i className="fas fa-graduation-cap"></i>
          <span>Test4U</span>
        </div>

        <div className="navbar-slogan">
          <i className="fas fa-lightbulb slogan-icon"></i>
          Nền tảng thi trắc nghiệm thông minh
        </div>

        {/* Navigation links - bạn có thể thêm nếu cần */}
        {isAuthenticated && (
          <div className="nav-links">
            {/* Ví dụ: */}
            {/* <Link to="/exams" className={location.pathname === '/exams' ? 'active' : ''}>Danh sách bài thi</Link> */}
          </div>
        )}

        {/* User menu */}
        <div className="user-menu">
          {isAuthenticated ? (
            <div className="user-menu-container">
              <button className="user-menu-button" onClick={toggleUserMenu}>
                <div className="user-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <span className="user-name">{getUserDisplayName()}</span>
                <i
                  className={`fas fa-chevron-down ${
                    isUserMenuOpen ? "up" : ""
                  }`}
                ></i>
              </button>

              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-item">
                    <i className="fas fa-user-circle"></i>
                    <span>Thông tin cá nhân</span>
                  </Link>
                  <Link to="/change-password" className="dropdown-item">
                    <i className="fas fa-key"></i>
                    <span>Đổi mật khẩu</span>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Đăng xuất</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-button">
              <i className="fas fa-sign-in-alt"></i>
              <span>Đăng nhập</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
