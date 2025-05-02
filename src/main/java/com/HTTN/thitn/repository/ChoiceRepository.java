package com.HTTN.thitn.repository;

import com.HTTN.thitn.model.Choice;
import com.HTTN.thitn.model.QuestionBank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChoiceRepository extends JpaRepository<Choice, Integer> {
    List<Choice> findByQuestionBank(QuestionBank questionBank);
}