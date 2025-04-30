import React, { useState } from 'react';

const QuestionManager = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    examId: ''
  });

  const handleAddQuestion = () => {
    const question = { ...newQuestion, id: Date.now() };
    setQuestions([...questions, question]);
    setNewQuestion({ text: '', options: ['', '', '', ''], correctAnswer: '', examId: '' });
  };

  return (
    <div className="question-manager">
      <h2>Quản lý câu hỏi</h2>
      <input
        value={newQuestion.text}
        onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
        placeholder="Nội dung câu hỏi"
      />
      {newQuestion.options.map((option, index) => (
        <input
          key={index}
          value={option}
          onChange={(e) => {
            const newOptions = [...newQuestion.options];
            newOptions[index] = e.target.value;
            setNewQuestion({ ...newQuestion, options: newOptions });
          }}
          placeholder={`Đáp án ${index + 1}`}
        />
      ))}
      <input
        value={newQuestion.correctAnswer}
        onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
        placeholder="Đáp án đúng"
      />
      <input
        value={newQuestion.examId}
        onChange={(e) => setNewQuestion({ ...newQuestion, examId: e.target.value })}
        placeholder="ID bộ đề"
      />
      <button onClick={handleAddQuestion}>Thêm câu hỏi</button>

      <div className="question-list">
        {questions.map(q => (
          <div key={q.id}>
            <p>{q.text} (Đúng: {q.correctAnswer})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionManager;