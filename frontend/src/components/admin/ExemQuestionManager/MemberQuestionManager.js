import React, { useState, useEffect } from 'react';
import './MemberQuestionManager.css'; // Tùy chọn: Thêm CSS nếu cần

const MemberQuestionManager = ({ userRole }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const mockQuestions = [
      { id: 1, content: 'Câu hỏi 1: Nội dung câu hỏi mẫu 1' },
      { id: 2, content: 'Câu hỏi 2: Nội dung câu hỏi mẫu 2' },
      { id: 3, content: 'Câu hỏi 3: Nội dung câu hỏi mẫu 3' },
    ];
    console.log(mockQuestions); // Kiểm tra dữ liệu mẫu
    setQuestions(mockQuestions);
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
                {/* Chỉ hiển thị nút nếu userRole là admin */}
                {/* {userRole === 'admin' && ( */}
                  <>
                    <button className="btn btn-primary">Sửa</button>
                    <button className="btn btn-danger">Xóa</button>
                  </>
                {/* // )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberQuestionManager;