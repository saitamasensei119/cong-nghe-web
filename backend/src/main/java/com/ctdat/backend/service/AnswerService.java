package com.ctdat.backend.service;

import com.ctdat.backend.model.Answer;
import com.ctdat.backend.model.Choice;
import com.ctdat.backend.model.Question;
import com.ctdat.backend.model.Submission;
import com.ctdat.backend.repository.AnswerRepository;
import com.ctdat.backend.repository.ChoiceRepository;
import com.ctdat.backend.repository.QuestionRepository;
import com.ctdat.backend.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ChoiceRepository choiceRepository;

    public Answer createAnswer(Integer submissionId, Integer questionId, Integer choiceId, String userRole) {
        if (!userRole.equals("student")) {
            throw new SecurityException("Only students can submit answers");
        }
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new EntityNotFoundException("Submission not found with id: " + submissionId));
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));
        Choice choice = choiceRepository.findById(choiceId)
                .orElseThrow(() -> new EntityNotFoundException("Choice not found with id: " + choiceId));
        if (!choice.getQuestionBank().getId().equals(question.getQuestionBank().getId())) {
            throw new IllegalArgumentException("Choice does not belong to the specified question");
        }
        Answer answer = new Answer();
        answer.setSubmission(submission);
        answer.setQuestion(question);
        answer.setChosenChoice(choice);
        return answerRepository.save(answer);
    }
}
