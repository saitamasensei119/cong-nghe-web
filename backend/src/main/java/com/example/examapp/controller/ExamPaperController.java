package com.example.examapp.controller;

import com.example.examapp.entity.ExamPaper;
import com.example.examapp.service.ExamPaperService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
public class ExamPaperController {

    private final ExamPaperService service;

    public ExamPaperController(ExamPaperService service) {
        this.service = service;
    }

    @PostMapping
    public ExamPaper create(@RequestBody ExamPaper examPaper) {
        return service.createExam(examPaper);
    }

    @GetMapping
    public List<ExamPaper> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ExamPaper getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
