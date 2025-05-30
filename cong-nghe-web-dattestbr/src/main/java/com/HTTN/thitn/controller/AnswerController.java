package com.HTTN.thitn.controller;

import com.HTTN.thitn.dto.Response.AnswerResponse;
import com.HTTN.thitn.entity.Answer;
import com.HTTN.thitn.entity.User;
import com.HTTN.thitn.mapper.AnswerResponseMapper;
import com.HTTN.thitn.security.CustomUserDetails;
import com.HTTN.thitn.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;
    // gửi đáp án cho từng câu hỏi
    @PostMapping("/submission/{submissionId}/question/{questionId}/choice/{choiceId}")
    public ResponseEntity<AnswerResponse> createAnswer(@PathVariable Integer submissionId,
                                                       @PathVariable Integer questionId,
                                                       @PathVariable Integer choiceId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = userDetails.getUser();

        Answer answer = answerService.createAnswer(submissionId, questionId, choiceId, user);
        AnswerResponse response = AnswerResponseMapper.toResponse(answer);
        return ResponseEntity.status(201).body(response);
    }

    //gửi đáp cho câu hoi nhiều lựa chọn
    @PostMapping("/submission/{submissionId}/question/{questionId}/choices")
    public ResponseEntity<AnswerResponse> createMultiChoiceAnswer(
            @PathVariable Integer submissionId,
            @PathVariable Integer questionId,
            @RequestBody List<Integer> choiceIds) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = userDetails.getUser();

        Answer answer = answerService.createMultiChoiceAnswer(submissionId, questionId, choiceIds, user);
        AnswerResponse response = AnswerResponseMapper.toResponse(answer);
        return ResponseEntity.status(201).body(response);
    }



}