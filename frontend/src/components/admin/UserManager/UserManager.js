import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManager.css';
const UserManager = () => {
  // State quản lý danh sách thành viên
  const [users, setUsers] = useState([]);
  // State cho form thêm/sửa thành viên
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    role: 'user' // Mặc định là user, có thể là admin
  });
  // State kiểm soát trạng thái loading
  const [loading, setLoading] = useState(true);
  // State kiểm soát chế độ chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);

  // Lấy danh sách thành viên từ backend khi component mount
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
          role: 'Học sinh',
          status: 'Active'
        },
        {
          id: 2,
          name: 'Trần Thị B',
          email: 'tranthib@example.com',
          role: 'Giáo viên',
          status: 'Active'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Xử lý thay đổi input trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Thêm hoặc sửa thành viên
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        // Cập nhật thành viên
        const response = await axios.put(`/api/users/${formData.id}`, formData);
        setUsers(users.map(user =>
          user.id === formData.id ? response.data : user
        ));
      } else {
        // Thêm thành viên mới
        const response = await axios.post('/api/users', formData);
        setUsers([...users, response.data]);
      }
      // Reset form sau khi thêm/sửa
      resetForm();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Xóa thành viên
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa thành viên này?')) {
      try {
        setLoading(true);
        await axios.delete(`/api/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Chuyển sang chế độ chỉnh sửa
  const handleEdit = (user) => {
    setFormData({ ...user, password: '' }); // Không hiển thị mật khẩu cũ
    setIsEditing(true);
  };

  // Reset form về trạng thái ban đầu
  const resetForm = () => {
    setFormData({ id: null, name: '', email: '', password: '', role: 'user' });
    setIsEditing(false);
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="user-manager">
      <h2>Quản lý người dùng</h2>
      <div className="user-list">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Vai trò: {user.role}</p>
            <p>Trạng thái: {user.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManager;