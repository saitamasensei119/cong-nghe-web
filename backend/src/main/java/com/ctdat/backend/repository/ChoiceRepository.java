package com.ctdat.backend.repository;

import com.ctdat.backend.model.Choice;
import com.ctdat.backend.model.QuestionBank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChoiceRepository extends JpaRepository<Choice, Integer> {
    List<Choice> findByQuestionBank(QuestionBank questionBank);
}