package com.ctdat.backend.service;

import com.ctdat.backend.model.EssayAnswer;
import com.ctdat.backend.model.Question;
import com.ctdat.backend.model.Submission;
import com.ctdat.backend.repository.EssayAnswerRepository;
import com.ctdat.backend.repository.QuestionRepository;
import com.ctdat.backend.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class EssayAnswerService {

    @Autowired
    private EssayAnswerRepository essayAnswerRepository;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public EssayAnswer createEssayAnswer(Integer submissionId, Integer questionId, String answerText, String userRole) {
        if (!userRole.equals("student")) {
            throw new SecurityException("Only students can submit essay answers");
        }
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new EntityNotFoundException("Submission not found with id: " + submissionId));
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));
        if (!question.getQuestionBank().getQuestionType().equals("short_answer")) {
            throw new IllegalArgumentException("Essay answers are only allowed for short_answer questions");
        }
        EssayAnswer essayAnswer = new EssayAnswer();
        essayAnswer.setSubmission(submission);
        essayAnswer.setQuestion(question);
        essayAnswer.setAnswerText(answerText);
        return essayAnswerRepository.save(essayAnswer);
    }
}