package com.ctdat.backend.repository;

import com.ctdat.backend.model.Answer;
import com.ctdat.backend.model.Question;
import com.ctdat.backend.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    List<Answer> findBySubmission(Submission submission);
    List<Answer> findByQuestion(Question question);
}
