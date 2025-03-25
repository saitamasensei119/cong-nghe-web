import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [loading, setLoading] = useState(false);
  // State kiểm soát chế độ chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);

  // Lấy danh sách thành viên từ backend khi component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="user-manager">
      <h2>Quản lý thành viên</h2>

      {/* Form thêm/sửa thành viên */}
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Tên thành viên"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder={isEditing ? 'Mật khẩu mới (nếu thay đổi)' : 'Mật khẩu'}
          required={!isEditing}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Đang xử lý...' : isEditing ? 'Cập nhật' : 'Thêm thành viên'}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} disabled={loading}>
            Hủy
          </button>
        )}
      </form>

      {/* Danh sách thành viên */}
      {loading && <p>Đang tải...</p>}
      <div className="user-list">
        {users.length === 0 && !loading ? (
          <p>Chưa có thành viên nào.</p>
        ) : (
          users.map(user => (
            <div key={user.id} className="user-item">
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Vai trò: {user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</p>
              </div>
              <div className="user-actions">
                <button onClick={() => handleEdit(user)} disabled={loading}>
                  Sửa
                </button>
                <button onClick={() => handleDelete(user.id)} disabled={loading}>
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

export default UserManager;