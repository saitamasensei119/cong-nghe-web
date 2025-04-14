package com.example.examapp.service;

import com.example.examapp.entity.ExamPaper;
import com.example.examapp.repository.ExamPaperRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamPaperService {

    private final ExamPaperRepository repo;

    public ExamPaperService(ExamPaperRepository repo) {
        this.repo = repo;
    }

    public ExamPaper createExam(ExamPaper paper) {
        return repo.save(paper);
    }

    public List<ExamPaper> getAll() {
        return repo.findAll();
    }

    public ExamPaper getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}

