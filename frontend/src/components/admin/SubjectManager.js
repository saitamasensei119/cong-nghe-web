import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubjectManager = () => {
  // State quản lý danh sách môn học
  const [subjects, setSubjects] = useState([]);
  // State cho form thêm/sửa môn học
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: ''
  });
  // State kiểm soát trạng thái loading
  const [loading, setLoading] = useState(false);
  // State kiểm soát chế độ chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);

  // Lấy danh sách môn học từ backend khi component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thay đổi input trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Thêm hoặc sửa môn học
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        // Cập nhật môn học
        const response = await axios.put(`/api/subjects/${formData.id}`, formData);
        setSubjects(subjects.map(subject => 
          subject.id === formData.id ? response.data : subject
        ));
      } else {
        // Thêm môn học mới
        const response = await axios.post('/api/subjects', formData);
        setSubjects([...subjects, response.data]);
      }
      // Reset form sau khi thêm/sửa
      resetForm();
    } catch (error) {
      console.error('Error saving subject:', error);
    } finally {
      setLoading(false);
    }
  };

  // Xóa môn học
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/subjects/${id}`);
      setSubjects(subjects.filter(subject => subject.id !== id));
    } catch (error) {
      console.error('Error deleting subject:', error);
    } finally {
      setLoading(false);
    }
  };

  // Chuyển sang chế độ chỉnh sửa
  const handleEdit = (subject) => {
    setFormData(subject);
    setIsEditing(true);
  };

  // Reset form về trạng thái ban đầu
  const resetForm = () => {
    setFormData({ id: null, name: '', description: '' });
    setIsEditing(false);
  };

  return (
    <div className="subject-manager">
      <h2>Quản lý môn học</h2>

      {/* Form thêm/sửa môn học */}
      <form onSubmit={handleSubmit} className="subject-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Tên môn học"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Mô tả môn học"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Đang xử lý...' : isEditing ? 'Cập nhật' : 'Thêm môn học'}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} disabled={loading}>
            Hủy
          </button>
        )}
      </form>

      {/* Danh sách môn học */}
      {loading && <p>Đang tải...</p>}
      <div className="subject-list">
        {subjects.length === 0 && !loading ? (
          <p>Chưa có môn học nào.</p>
        ) : (
          subjects.map(subject => (
            <div key={subject.id} className="subject-item">
              <div className="subject-info">
                <h3>{subject.name}</h3>
                <p>{subject.description || 'Không có mô tả'}</p>
              </div>
              <div className="subject-actions">
                <button onClick={() => handleEdit(subject)} disabled={loading}>
                  Sửa
                </button>
                <button onClick={() => handleDelete(subject.id)} disabled={loading}>
                  Xóa
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubjectManager;