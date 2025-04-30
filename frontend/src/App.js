import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar/Navbar';
import Footer from './components/Layout/Footer/Footer';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ExamPage from './pages/ExamPage/ExamPage';
import TakeExamPage from './pages/TakeExamPage/TakeExamPage';
import StatisticsPage from './pages/StatisticsPage/StatisticsPage';
import LoginPage from './pages/LoginPage/LoginPage'; // Thêm trang đăng nhập
import ExamManager from './components/admin/ExamManager/ExamManager';
import ResultViewer from './components/admin/ResultViewer/ResultViewer';
import axios from 'axios';
import AddExamPage from './pages/AddExamPage/AddExamPage'; // Thêm trang thêm đề thi
// Component bảo vệ route cho admin
const ProtectedRoute = ({ children, isAdmin }) => {
  return isAdmin ? children : <Navigate to="/login" />;
};

function App() {
  // State quản lý trạng thái đăng nhập
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [exams, setExams] = useState([
    { id: 1, title: 'Đề thi Toán lớp 10', subject: 'Toán', isTaken: false },
    { id: 2, title: 'Đề thi Lý lớp 11', subject: 'Vật lý', isTaken: true },
    { id: 3, title: 'Đề thi Hóa lớp 12', subject: 'Hóa học', isTaken: false },
  ]);

  // Hàm thêm đề thi mới
  const handleAddExam = (newExam) => {
    setExams([...exams, newExam]);
  };
  // Kiểm tra trạng thái đăng nhập khi ứng dụng khởi động
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Hàm đăng nhập (gọi từ LoginPage)
  const handleLogin = (userData) => {
    setUser(userData);
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <Router>
      <div className="app">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="content">
          <Routes>
            {/* Trang chính: Danh sách bài thi */}
            <Route path="/" element={<ExamPage />} />

            {/* Trang xem danh sách bài thi */}
            <Route path="/exams" element={<ExamPage />} />

            {/* Trang thi trắc nghiệm */}
            <Route path="/take-exam/:id" element={<TakeExamPage />} />

            {/* Trang thống kê */}
            <Route path="/statistics" element={<StatisticsPage />} />

            {/* Trang admin - yêu cầu quyền admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAdmin={user?.role === 'admin'}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            {/* Route quản lý đề thi */}
            <Route
              path="/admin/questions"
              element={<ExamManager exams={exams} />}
            />
            <Route
              path="/admin/questions/add"
              element={<AddExamPage onAddExam={handleAddExam} />}
            />
            <Route path="/results/:id" component={ResultViewer} />
            
            {/* Trang đăng nhập */}
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

            {/* Redirect nếu đường dẫn không tồn tại */}
            <Route path="*" element={<Navigate to="/" />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;