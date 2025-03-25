import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Quiz App</Link>
      <div className="nav-links">
        <Link to="/exams">Danh sách bài thi</Link>
        <Link to="/statistics">Thống kê</Link>
        {user?.role === 'admin' && <Link to="/admin">Quản lý</Link>}
        {user ? (
          <button onClick={onLogout}>Đăng xuất</button>
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;