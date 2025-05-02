package com.HTTN.thitn.repository;

import com.HTTN.thitn.model.Answer;
import com.HTTN.thitn.model.Question;
import com.HTTN.thitn.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    List<Answer> findBySubmission(Submission submission);
    List<Answer> findByQuestion(Question question);
}
