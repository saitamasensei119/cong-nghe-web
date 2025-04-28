package com.ctdat.backend.repository;

import com.ctdat.backend.model.Exam;
import com.ctdat.backend.model.Subject;
import com.ctdat.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamRepository extends JpaRepository<Exam, Integer> {
    List<Exam> findBySubject(Subject subject);
    List<Exam> findByCreatedBy(User createdBy);
}