package com.ctdat.backend.controller;

import com.ctdat.backend.model.QuestionBank;
import com.ctdat.backend.model.User;
import com.ctdat.backend.service.QuestionBankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionBankController {

    @Autowired
    private QuestionBankService questionBankService;

    @PostMapping
    public ResponseEntity<QuestionBank> createQuestion(@RequestBody QuestionBank question,
                                                       @RequestHeader("X-User-Id") Integer userId,
                                                       @RequestHeader("X-User-Role") String userRole) {
        User createdBy = new User();
        createdBy.setId(userId);
        QuestionBank createdQuestion = questionBankService.createQuestion(question, createdBy, userRole);
        return ResponseEntity.status(201).body(createdQuestion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuestionBank> updateQuestion(@PathVariable Integer id,
                                                       @RequestBody QuestionBank question,
                                                       @RequestHeader("X-User-Role") String userRole) {
        QuestionBank updatedQuestion = questionBankService.updateQuestion(id, question, userRole);
        return ResponseEntity.ok(updatedQuestion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Integer id, @RequestHeader("X-User-Role") String userRole) {
        questionBankService.deleteQuestion(id, userRole);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionBank> getQuestionById(@PathVariable Integer id) {
        QuestionBank question = questionBankService.getQuestionById(id);
        return ResponseEntity.ok(question);
    }

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<QuestionBank>> getQuestionsBySubject(@PathVariable Integer subjectId) {
        List<QuestionBank> questions = questionBankService.getQuestionsBySubject(subjectId);
        return ResponseEntity.ok(questions);
    }
}
