package com.ctdat.backend.service;

import com.ctdat.backend.model.Exam;
import com.ctdat.backend.model.Question;
import com.ctdat.backend.model.QuestionBank;
import com.ctdat.backend.repository.ExamRepository;
import com.ctdat.backend.repository.QuestionBankRepository;
import com.ctdat.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private QuestionBankRepository questionBankRepository;

    public Question addQuestionToExam(Integer examId, Integer questionBankId, String userRole) {
        if (!userRole.equals("teacher") && !userRole.equals("admin")) {
            throw new SecurityException("Only teachers or admins can add questions to exams");
        }
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new EntityNotFoundException("Exam not found with id: " + examId));
        QuestionBank questionBank = questionBankRepository.findById(questionBankId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionBankId));
        Question question = new Question();
        question.setExam(exam);
        question.setQuestionBank(questionBank);
        return questionRepository.save(question);
    }

    public void removeQuestionFromExam(Integer questionId, String userRole) {
        if (!userRole.equals("teacher") && !userRole.equals("admin")) {
            throw new SecurityException("Only teachers or admins can remove questions from exams");
        }
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));
        questionRepository.delete(question);
    }

    public List<Question> getQuestionsByExam(Integer examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new EntityNotFoundException("Exam not found with id: " + examId));
        return questionRepository.findByExam(exam);
    }
}