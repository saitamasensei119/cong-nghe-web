package com.HTTN.thitn.repository;

import com.HTTN.thitn.entity.Answer;
import com.HTTN.thitn.entity.AnswerChoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerChoiceRepository extends JpaRepository<AnswerChoice, Integer> {
    List<AnswerChoice> findByAnswer(Answer answer);

    void deleteByAnswer(Answer answer);
}
