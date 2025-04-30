import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ExamManager.css';

const ExamManager = ({ userRole }) => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  useEffect(() => {
    const mockQuestions = [
      { id: 1, title: 'Đề thi Toán lớp 10', subject: 'Toán', isTaken: false },
      { id: 2, title: 'Đề thi Lý lớp 11', subject: 'Vật lý', isTaken: true },
      { id: 3, title: 'Đề thi Hóa lớp 12', subject: 'Hóa học', isTaken: false },
    ];
    setQuestions(mockQuestions);
  }, []);

  const handleDelete = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const handleTakeExam = (id) => {
    // Điều hướng đến giao diện thi
    navigate(`/take-exam/${id}`);
  };

  const handleStatusChange = (id, newStatus) => {
    setQuestions(
      questions.map((question) =>
        question.id === id ? { ...question, isTaken: newStatus === 'Đã thi' } : question
      )
    );
  };

  return (
    <div className="question-manager">
      <h1>Quản lý đề thi</h1>

      {/* Nút thêm đề thi (chỉ hiển thị cho admin) */}
      {/* {userRole === 'admin' && ( */}
      <button
          className="add-question-btn"
          onClick={() => navigate('/admin/questions/add')}>
          + Thêm đề thi
      </button>
      {/* )} */}

      <table className="table1">
        <thead>
          <tr>
            <th>Mã số</th>
            <th>Tên đề</th>
            <th>Môn học</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td
                style={{ color: 'black',textDecoration: 'underline', fontWeight: 'bold', cursor: 'pointer' }} // Thêm style để hiển thị tên đề thi có thể bấm
                onClick={() => handleTakeExam(question.id)} // Điều hướng khi bấm vào tên đề thi
              >
                {question.title}
              </td>
              <td>{question.subject}</td>
              <td>
                <select
                  value={question.isTaken ? 'Đã thi' : 'Chưa thi'}
                  onChange={(e) => {
                    e.stopPropagation(); // Ngăn sự kiện click trên hàng
                    handleStatusChange(question.id, e.target.value);
                  }}
                >
                  <option value="Chưa thi">Chưa thi</option>
                  <option value="Đã thi">Đã thi</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  disabled={userRole !== 'admin'} // Vô hiệu hóa nếu không phải admin
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn sự kiện click trên hàng
                  }}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger"
                  disabled={userRole !== 'admin'} // Vô hiệu hóa nếu không phải admin
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn sự kiện click trên hàng
                    handleDelete(question.id);
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamManager;