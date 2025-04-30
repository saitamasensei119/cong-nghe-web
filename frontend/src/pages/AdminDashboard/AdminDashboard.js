import React from 'react';
// import QuestionManager from '../../components/admin/QuestionManager/QuestionManager';
import ExamManager from '../../components/admin/ExamManager/ExamManager';
import UserManager from '../../components/admin/UserManager';
import SubjectManager from '../../components/admin/SubjectManager';
const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-sections">
        <ExamManager />      {/* Quản lý bộ đề thi */}
        {/* <QuestionManager />  Quản lý câu hỏi */}
        <SubjectManager />   {/* Quản lý môn học */}
        <UserManager />      {/* Quản lý thành viên */}
      </div>
    </div>
  );
};


export default AdminDashboard;