package com.HTTN.thitn.repository;

import com.HTTN.thitn.entity.Answer;
import com.HTTN.thitn.entity.Question;
import com.HTTN.thitn.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    List<Answer> findBySubmission(Submission submission);
    List<Answer> findByQuestion(Question question);
    Optional<Answer> findBySubmissionAndQuestion(Submission submission, Question question);

}
