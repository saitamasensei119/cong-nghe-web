package com.example.examapp.repository;

import com.example.examapp.entity.ExamPaper;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamPaperRepository extends JpaRepository<ExamPaper, Long> {
}
