package com.HTTN.thitn.controller;

import com.HTTN.thitn.entity.Question;
import com.HTTN.thitn.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/exam/{examId}/question-bank/{questionBankId}")
    public ResponseEntity<Question> addQuestionToExam(@PathVariable Integer examId,
                                                      @PathVariable Integer questionBankId,
                                                      @RequestHeader("X-User-Role") String userRole) {
        Question question = questionService.addQuestionToExam(examId, questionBankId, userRole);
        return ResponseEntity.status(201).body(question);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeQuestionFromExam(@PathVariable Integer id,
                                                       @RequestHeader("X-User-Role") String userRole) {
        questionService.removeQuestionFromExam(id, userRole);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/exam/{examId}")
    public ResponseEntity<List<Question>> getQuestionsByExam(@PathVariable Integer examId) {
        List<Question> questions = questionService.getQuestionsByExam(examId);
        return ResponseEntity.ok(questions);
    }
}