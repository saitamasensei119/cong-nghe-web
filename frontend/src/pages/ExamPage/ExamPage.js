  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import './ExamPage.css';
  import { useNavigate } from 'react-router-dom';
  import { EditOutlined, PlusOutlined } from '@ant-design/icons';
  import { Button } from 'antd';
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
    const [showForm, setShowForm] = useState(false);
    const [editSubject, setEditSubject] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '' });

    const navigate = useNavigate();
    const openAddForm = () => {
      setEditSubject(null);
      setFormData({ name: '', description: '' });
      setShowForm(true);
    };
    const openEditForm = (subject) => {
      setEditSubject(subject);
      setFormData({ name: subject.name, description: subject.description });
      setShowForm(true);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      try {
        if (editSubject) {
          // Sửa môn học
          const res = await axios.put(
              `/api/teacher/subjects/${editSubject.id}`,
              formData,
              { headers: { Authorization: `Bearer ${token}` } }
          );
          setSubjects(subjects.map(s => s.id === editSubject.id ? res.data : s));
        } else {
          // Đăng ký mới
          const res = await axios.post(
              '/api/teacher/subjects',
              formData,
              { headers: { Authorization: `Bearer ${token}` } }
          );
          setSubjects([...subjects, res.data]);
        }
        setShowForm(false);
      } catch (err) {
        alert('Lưu thất bại!');
      }
    };
    const closeForm = () => setShowForm(false);

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
    // const handleDelete = async (subjectId) => {
    //   if (!window.confirm('Bạn chắc chắn muốn xoá môn học này?')) return;
    //   try {
    //     const token = localStorage.getItem('token');
    //     await axios.delete(`/api/teacher/subjects/${subjectId}`, {
    //       headers: { Authorization: `Bearer ${token}` }
    //     });
    //     setSubjects(subjects.filter(s => s.id !== subjectId));
    //     setMenuOpen(null);
    //   } catch (err) {
    //     alert('Xoá thất bại!');
    //   }
    // };

    if (loading) return <p className="loading">Đang tải dữ liệu...</p>;
    if (error) return <p className="error">Lỗi: {error}</p>;


    return (
        <div className={`exam-container main-content ep${showForm ? ' modal-open' : ''}`}>
          <h1 className="subject-title">Danh sách môn học của tôi</h1>
          <Button
              onClick={openAddForm}
              className="add-subject-btn"
              icon={<PlusOutlined />}
              type="primary"
          >
            Đăng ký môn học
          </Button>
          {showForm && (
              <div className="modal">
                <form className="subject-form" onSubmit={handleSubmit}>
                  <h2>{editSubject ? 'Sửa môn học' : 'Đăng ký môn học'}</h2>
                  <input
                      type="text"
                      placeholder="Tên môn học"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                  />
                  <input
                      type="text"
                      placeholder="Mô tả"
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                  <button type="submit">Lưu</button>
                  <button type="button" onClick={closeForm}>Huỷ</button>
                </form>
              </div>
          )}
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
                        <div className="subject-card-title">
                          {subject.name}
                          <EditOutlined
                              className="edit-icon"
                              style={{ color: '#1890ff', fontSize: 18, marginLeft: 8, cursor: 'pointer' }}
                              title="Sửa môn học"
                              onClick={e => {
                                e.stopPropagation();
                                openEditForm(subject);
                              }}
                          />
                        </div>
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
