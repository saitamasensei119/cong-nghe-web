package com.HTTN.thitn.repository;

import com.HTTN.thitn.model.Exam;
import com.HTTN.thitn.model.Question;
import com.HTTN.thitn.model.QuestionBank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findByExam(Exam exam);
    List<Question> findByQuestionBank(QuestionBank questionBank);
}