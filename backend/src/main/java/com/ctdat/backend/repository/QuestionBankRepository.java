package com.ctdat.backend.repository;

import com.ctdat.backend.model.QuestionBank;
import com.ctdat.backend.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionBankRepository extends JpaRepository<QuestionBank, Integer> {
    List<QuestionBank> findBySubject(Subject subject);
    List<QuestionBank> findByQuestionTypeAndDifficulty(String questionType, Integer difficulty);
}