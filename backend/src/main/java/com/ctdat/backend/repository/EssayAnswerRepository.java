package com.ctdat.backend.repository;

import com.ctdat.backend.model.EssayAnswer;
import com.ctdat.backend.model.Question;
import com.ctdat.backend.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EssayAnswerRepository extends JpaRepository<EssayAnswer, Integer> {
    List<EssayAnswer> findBySubmission(Submission submission);
    List<EssayAnswer> findByQuestion(Question question);
}