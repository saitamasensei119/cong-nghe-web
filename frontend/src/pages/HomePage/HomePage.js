import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setLoading(false);
      } catch (error) {
        console.error('Invalid token:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const getUserRole = () => {
    if (!user || !user.roles) return null;
    return user.roles[0];
  };

  const renderStudentDashboard = () => (
    <div className="dashboard-content">
      <div className="welcome-section">
        <h1>Chào mừng, {user.sub}!</h1>
        <p>Hãy bắt đầu học tập và làm bài thi ngay hôm nay</p>
      </div>

      <div className="quick-actions">
        <h3>Hành động nhanh</h3>
        <div className="action-buttons">
          <button className="action-btn primary" onClick={() => navigate('/student')}>
            <i className="fas fa-book-open"></i>
            <span>Xem môn học</span>
          </button>
          <button className="action-btn secondary" onClick={() => navigate('/profile')}>
            <i className="fas fa-user-edit"></i>
            <span>Cập nhật hồ sơ</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="dashboard-content">
      <div className="welcome-section">
        <h1>Chào mừng Giáo viên, {user.sub}!</h1>
        <p>Quản lý môn học và tạo bài thi cho học sinh</p>
      </div>

      <div className="quick-actions">
        <h3>Hành động nhanh</h3>
        <div className="action-buttons">
          <button className="action-btn primary" onClick={() => navigate('/teacher')}>
            <i className="fas fa-book"></i>
            <span>Quản lý môn học</span>
          </button>
          <button className="action-btn secondary" onClick={() => navigate('/profile')}>
            <i className="fas fa-user-edit"></i>
            <span>Cập nhật hồ sơ</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="dashboard-content">
      <div className="welcome-section">
        <h1>Chào mừng Quản trị viên, {user.sub}!</h1>
        <p>Quản lý toàn bộ hệ thống và người dùng</p>
      </div>

      <div className="quick-actions">
        <h3>Hành động nhanh</h3>
        <div className="action-buttons">
          <button className="action-btn primary" onClick={() => navigate('/admin')}>
            <i className="fas fa-tachometer-alt"></i>
            <span>Bảng điều khiển Admin</span>
          </button>
          <button className="action-btn info" onClick={() => navigate('/manage-users')}>
            <i className="fas fa-user-cog"></i>
            <span>Quản lý người dùng</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => {
    const role = getUserRole();
    switch (role) {
      case 'STUDENT':
        return renderStudentDashboard();
      case 'TEACHER':
        return renderTeacherDashboard();
      case 'ADMIN':
        return renderAdminDashboard();
      default:
        return (
          <div className="dashboard-content">
            <h1>Chào mừng!</h1>
            <p>Đang tải thông tin...</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="home-container">
        {renderDashboard()}
      </div>
    </div>
  );
};

export default HomePage; 