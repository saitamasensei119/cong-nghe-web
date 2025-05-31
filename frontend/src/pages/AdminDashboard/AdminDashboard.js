import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubjectManager from '../../components/admin/SubjectManager/SubjectManager';
import UserManager from '../../components/admin/UserManager/UserManager';
import { fetchListUsers } from '../../services/AdminService';
import { getPendingSubjects } from '../../services/SubjectService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalTeachers: 0,
    pendingSubjects: 0
  });
  const [notifications, setNotifications] = useState(3);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch stats and activities
    fetchStats();

    // Fetch users from database
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const responseStudents = await fetchListUsers('student');
      const responseTeachers = await fetchListUsers('teacher');

      // Add role information to each user
      const studentsWithRole = responseStudents.data.map(user => ({
        ...user,
        roles: [{ name: 'STUDENT' }]
      }));

      const teachersWithRole = responseTeachers.data.map(user => ({
        ...user,
        roles: [{ name: 'TEACHER' }]
      }));

      setUsers([...studentsWithRole, ...teachersWithRole]);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Không thể lấy danh sách người dùng. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch real statistics from backend
  const fetchStats = async () => {
    try {
      // Fetch users by role to get real counts
      const [studentsResponse, teachersResponse, pendingSubjectsResponse] = await Promise.all([
        fetchListUsers('student'),
        fetchListUsers('teacher'),
        getPendingSubjects()
      ]);

      const totalStudents = studentsResponse.data.length;
      const totalTeachers = teachersResponse.data.length;
      const pendingSubjects = pendingSubjectsResponse.length;

      setStats({
        totalUsers: totalStudents + totalTeachers,
        totalStudents,
        totalTeachers,
        pendingSubjects
      });

      // Update notifications count based on pending subjects
      setNotifications(pendingSubjects);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback to mock data
      setStats({
        totalUsers: 1250,
        totalStudents: 1000,
        totalTeachers: 250,
        pendingSubjects: 0
      });
    }
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon users">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{stats.totalUsers}</div>
                  <div className="stat-label">Tổng số người dùng</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon students">
                  <i className="fas fa-user-graduate"></i>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{stats.totalStudents}</div>
                  <div className="stat-label">Sinh viên</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon teachers">
                  <i className="fas fa-chalkboard-teacher"></i>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{stats.totalTeachers}</div>
                  <div className="stat-label">Giáo viên</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon pending">
                  <i className="fas fa-hourglass-half"></i>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{stats.pendingSubjects}</div>
                  <div className="stat-label">Môn học chờ duyệt</div>
                </div>
              </div>
            </div>
          </>
        );
      case 'users':
        return <UserManager users={users} loading={loading} error={error} refreshUsers={fetchUsers} />;
      case 'subjects':
        return <SubjectManager refreshStats={fetchStats} />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>Quản lý hệ thống</p>
        </div>
        <ul className="sidebar-menu">
          <li
            className={`menu-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleMenuClick('dashboard')}
          >
            <i className="fas fa-home"></i>
            Dashboard
          </li>
          <li
            className={`menu-item ${activeMenu === 'users' ? 'active' : ''}`}
            onClick={() => handleMenuClick('users')}
          >
            <i className="fas fa-users"></i>
            Quản lý người dùng
          </li>
          <li
            className={`menu-item ${activeMenu === 'subjects' ? 'active' : ''}`}
            onClick={() => handleMenuClick('subjects')}
          >
            <i className="fas fa-book"></i>
            Quản lý môn học
            {stats.pendingSubjects > 0 && (
              <span className="menu-badge">{stats.pendingSubjects}</span>
            )}
          </li>
        </ul>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button
            className="back-to-home-btn"
            onClick={() => navigate('/home')}
            title="Quay lại trang chủ"
          >
            <i className="fas fa-home"></i>
            <span>Trang chủ</span>
          </button>
          <h1>Dashboard</h1>
        </div>
        {/* <div className="header-right">
          <div className="notification-icon">
            <i className="fas fa-bell"></i>
            {notifications > 0 && (
              <span className="notification-badge">{notifications}</span>
            )}
          </div>
          <div className="user-menu" onClick={handleLogout}>
            <div className="user-avatar">A</div>
            <div className="user-info">
              <span className="user-name">Admin</span>
              <span className="user-role">Quản trị viên</span>
            </div>
          </div>
        </div> */}
      </header>

      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;