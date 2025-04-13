import React, { useState } from 'react';

const ExamManager = () => {
  const [exams, setExams] = useState([]);
  const [newExam, setNewExam] = useState({ title: '', subject: '', questions: [] });

  const handleAddExam = () => {
    setExams([...exams, { ...newExam, id: Date.now() }]);
    setNewExam({ title: '', subject: '', questions: [] });
  };

  return (
    <div className="exam-manager">
      <h2>Quản lý bộ đề thi</h2>
      <input
        value={newExam.title}
        onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
        placeholder="Tên đề thi"
      />
      <input
        value={newExam.subject}
        onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
        placeholder="Môn học"
      />
      <button onClick={handleAddExam}>Thêm đề thi</button>
      
      <div className="exam-list">
        {exams.map(exam => (
          <div key={exam.id}>
            {exam.title} - {exam.subject}
            <button>Sửa</button>
            <button>Xóa</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamManager;