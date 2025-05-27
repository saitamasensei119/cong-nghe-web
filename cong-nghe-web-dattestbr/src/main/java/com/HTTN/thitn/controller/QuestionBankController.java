package com.HTTN.thitn.controller;

import com.HTTN.thitn.entity.QuestionBank;
import com.HTTN.thitn.entity.User;
import com.HTTN.thitn.security.CustomUserDetails;
import com.HTTN.thitn.service.QuestionBankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class QuestionBankController {

    @Autowired
    private QuestionBankService questionBankService;
    //crud câu hỏi
    @PostMapping("/teacher/question-bank")
    public ResponseEntity<QuestionBank> createQuestion(@RequestBody QuestionBank question) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = userDetails.getUser();

        QuestionBank createdQuestion = questionBankService.createQuestion(question, user);
        return ResponseEntity.status(201).body(createdQuestion);
    }

    @PutMapping("/teacher/question-bank/{id}")
    public ResponseEntity<QuestionBank> updateQuestion(@PathVariable Integer id,
                                                       @RequestBody QuestionBank question) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        QuestionBank updatedQuestion = questionBankService.updateQuestion(id, question, user);
        return ResponseEntity.ok(updatedQuestion);
    }


    @DeleteMapping("/teacher/question-bank/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Integer id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        questionBankService.deleteQuestion(id,user );
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/teacher/question-bank/{id}")
    public ResponseEntity<QuestionBank> getQuestionById(@PathVariable Integer id) {
        QuestionBank question = questionBankService.getQuestionById(id);
        return ResponseEntity.ok(question);
    }
    //Lấy danh sách câu hỏi thuộc một môn học.
    @GetMapping("/teacher/question-bank/subject/{subjectId}")
    public ResponseEntity<List<QuestionBank>> getQuestionsBySubject(@PathVariable Long subjectId) {
        List<QuestionBank> questions = questionBankService.getQuestionsBySubject(subjectId);
        return ResponseEntity.ok(questions);
    }
}
