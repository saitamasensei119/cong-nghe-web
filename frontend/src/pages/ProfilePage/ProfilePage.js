import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useUser } from '../../contexts/UserContext';
import { updateStudentProfile, updateTeacherProfile } from '../../services/UserService';

const ProfilePage = () => {
    const { user, userProfile, fetchUserProfile, loading, error } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullname: '',
        email: ''
    });
    const [updateSuccess, setUpdateSuccess] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false);

    // Combine user from JWT and userProfile from API
    const combinedUserData = {
        ...user, // JWT data (has roles, username)
        ...userProfile // API data (has id, fullname, email)
    };

    // Initialize form data when userProfile changes
    useEffect(() => {
        if (userProfile) {
            setFormData({
                fullname: userProfile.fullname || '',
                email: userProfile.email || ''
            });
        }
    }, [userProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setUpdateSuccess('');
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        setUpdateSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        setUpdateSuccess('');

        try {
            // Update profile information based on user role
            const profileUpdateData = {
                fullname: formData.fullname,
                email: formData.email
            };

            // Use role-specific update endpoints based on JWT roles
            if (combinedUserData.roles && combinedUserData.roles.includes('STUDENT')) {
                await updateStudentProfile(profileUpdateData);
            } else if (combinedUserData.roles && combinedUserData.roles.includes('TEACHER')) {
                await updateTeacherProfile(profileUpdateData);
            }

            // Refresh user profile
            await fetchUserProfile();

            setUpdateSuccess('Cập nhật thông tin thành công!');
            setIsEditing(false);

        } catch (err) {
            console.error('Error updating profile:', err);
            setUpdateSuccess(''); // Clear success message
        } finally {
            setUpdateLoading(false);
        }
    };

    if (loading && !userProfile) {
        return (
            <div className="profile-page loading-container">
                <div className="loading-spinner"></div>
                <p>Đang tải thông tin...</p>
            </div>
        );
    }

    if (error && !userProfile) {
        return (
            <div className="profile-page error-container">
                <div className="error-icon">
                    <i className="fas fa-exclamation-circle"></i>
                </div>
                <p className="error-message">{error}</p>
                <button className="btn-retry" onClick={fetchUserProfile}>
                    <i className="fas fa-redo"></i>
                    Thử lại
                </button>
            </div>
        );
    }

    const getUserRole = () => {
        if (!combinedUserData?.roles || combinedUserData.roles.length === 0) {
            return 'Người dùng';
        }

        if (combinedUserData.roles.includes('ADMIN')) return 'Quản trị viên';
        if (combinedUserData.roles.includes('TEACHER')) return 'Giáo viên';
        if (combinedUserData.roles.includes('STUDENT')) return 'Học sinh';
        return 'Người dùng';
    };

    // Check if user can edit (not ADMIN) - use JWT roles
    const canEdit = () => {
        if (!combinedUserData?.roles || combinedUserData.roles.length === 0) {
            return false;
        }

        const hasRoles = combinedUserData.roles.length > 0;
        const isNotAdmin = !combinedUserData.roles.includes('ADMIN');
        return hasRoles && isNotAdmin;
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <h1>
                        <i className="fas fa-user-circle"></i>
                        Thông tin cá nhân
                    </h1>
                    {canEdit() && (
                        <button
                            className={`btn-edit ${isEditing ? 'btn-cancel' : ''}`}
                            onClick={toggleEditMode}
                        >
                            <i className={`fas ${isEditing ? 'fa-times' : 'fa-edit'}`}></i>
                            {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                        </button>
                    )}
                </div>

                {updateSuccess && (
                    <div className="alert alert-success">
                        <i className="fas fa-check-circle"></i>
                        {updateSuccess}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                        <label>
                            <i className="fas fa-user-tag"></i>
                            Vai trò:
                        </label>
                        <p className="user-role">{getUserRole()}</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fullname">
                            <i className="fas fa-id-card"></i>
                            Họ và tên:
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                                placeholder="Nhập họ và tên của bạn"
                            />
                        ) : (
                            <p>{combinedUserData.fullname}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            <i className="fas fa-envelope"></i>
                            Email:
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Nhập email của bạn"
                            />
                        ) : (
                            <p>{combinedUserData.email}</p>
                        )}
                    </div>

                    {isEditing && (
                        <div className="form-actions">
                            <button
                                type="submit"
                                className="btn-save"
                                disabled={updateLoading}
                            >
                                <i className="fas fa-save"></i>
                                {updateLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ProfilePage; 