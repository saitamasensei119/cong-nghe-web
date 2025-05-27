import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExamPage.css';
import { useNavigate } from 'react-router-dom';
// Hàm lấy đường dẫn ảnh từ thư mục public/images
const getSubjectImage = (name) => {
  const key = name
      .normalize('NFD') // chuẩn hoá tổ hợp (dấu tách riêng)
      .replace(/[̀-ͯ]/g, '') // xoá dấu
      .toLowerCase()
      .trim();

  const images = {
    'toan': '/images/math.jpg',
    'vat ly': '/images/physic.jpg',
    'hoa hoc': '/images/chemis.jpg',
    'tieng anh': '/images/english.jpg',
    'sinh hoc': '/images/biology.jpg',
    'tin hoc': '/images/informatic.jpg',


  };

  // Nếu không có key, dùng ảnh mặc định
  return images[key] || './images/default.jpg';
};

const ExamPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchSubjects = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/teacher/subjects', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (isMounted) {
          setSubjects(response.data);
        }
      } catch (err) {
        console.error('Lỗi khi fetch môn học:', err);
        if (isMounted) {
          setError(
              err.response?.data?.message ||
              err.message ||
              'Đã xảy ra lỗi khi tải dữ liệu.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSubjects();
    return () => { isMounted = false; };
  }, []);

  if (loading) return <p className="loading">Đang tải dữ liệu...</p>;
  if (error) return <p className="error">Lỗi: {error}</p>;


  return (
      <div className="exam-container main-content ep">
        <h1 className="subject-title">Danh sách môn học của tôi</h1>
        {subjects.length === 0 ? (
            <p className="no-subjects">Không có môn học nào.</p>
        ) : (
            <div className="subject-list">
              {subjects.map((subject) => (
                  <div
                      className="subject-card"
                      key={subject.id}
                      onClick={() => {
                        console.log('Click subject', subject.id);
                        navigate(`/exams/subject/${subject.id}`);
                      }}
                  >
                    <div className="subject-card-img">
                      <img
                          src={getSubjectImage(subject.name)}
                          alt={subject.name}
                      />
                    </div>
                    <div className="subject-card-content">
                      <div className="subject-card-title">{subject.name}</div>
                      <div className="subject-card-desc">{subject.description}</div>
                      <div className="subject-card-meta">
                        <span>Mã môn: {subject.code || subject.id}</span>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default ExamPage;
