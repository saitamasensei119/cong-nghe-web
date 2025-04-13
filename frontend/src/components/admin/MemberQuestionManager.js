import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MemberQuestionManager.css'; // Tùy chọn: Thêm CSS nếu cần

const QuestionManager = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách đề thi
    axios.get('/api/questions', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  return (
    <div className="question-manager">
      <h1>Quản lý đề thi</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nội dung</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(question => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>{question.content}</td>
              <td>
                <button className="btn btn-primary">Sửa</button>
                <button className="btn btn-danger">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionManager;