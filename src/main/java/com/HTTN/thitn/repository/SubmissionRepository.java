package com.HTTN.thitn.repository;

import com.HTTN.thitn.model.Exam;
import com.HTTN.thitn.model.Submission;
import com.ctdat.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Integer> {
    List<Submission> findByExam(Exam exam);
    List<Submission> findByUser(User user);
    List<Submission> findByExamAndUser(Exam exam, User user);
}
