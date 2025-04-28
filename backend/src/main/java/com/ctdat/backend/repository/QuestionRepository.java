package com.ctdat.backend.repository;

import com.ctdat.backend.model.Exam;
import com.ctdat.backend.model.Question;
import com.ctdat.backend.model.QuestionBank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findByExam(Exam exam);
    List<Question> findByQuestionBank(QuestionBank questionBank);
}