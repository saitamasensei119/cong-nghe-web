package com.HTTN.thitn.service;

import com.HTTN.thitn.entity.*;
import com.HTTN.thitn.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

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

    @Autowired
    private AnswerChoiceRepository answerChoiceRepository;


    public Answer createAnswer(Integer submissionId, Integer questionId, Integer choiceId, User user) {
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new EntityNotFoundException("Submission not found with id: " + submissionId));
        if (!submission.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Bạn không có quyền nộp bài này.");
        }
        if (submission.getStatus() != null && submission.getStatus() == 1) {
            throw new IllegalStateException("Bài thi đã được nộp, không thể chỉnh sửa đáp án.");
        }
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));
        boolean questionBelongsToExam = questionRepository.existsByIdAndExamId(questionId, submission.getExam().getId());
        if (!questionBelongsToExam) {
            throw new IllegalArgumentException("Câu hỏi không thuộc đề thi.");
        }
        Choice choice = choiceRepository.findById(choiceId)
                .orElseThrow(() -> new EntityNotFoundException("Choice not found with id: " + choiceId));
        if (!choice.getQuestionBank().getId().equals(question.getQuestionBank().getId())) {
            throw new IllegalArgumentException("Choice does not belong to the specified question");
        }
        Optional<Answer> existingAnswerOpt = answerRepository.findBySubmissionAndQuestion(submission, question);
        Answer answer;
        if (existingAnswerOpt.isPresent()) {
            answer = existingAnswerOpt.get();
            answer.setChosenChoice(choice); // Cập nhật lựa chọn
        } else {
            answer = new Answer();
            answer.setSubmission(submission);
            answer.setQuestion(question);
            answer.setChosenChoice(choice);
        }
        return answerRepository.save(answer);
    }
    @Transactional
    public Answer createMultiChoiceAnswer(Integer submissionId, Integer questionId, List<Integer> choiceIds, User user) {
        Submission submission = getAndValidateSubmission(submissionId, user);
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found"));

        Answer answer = answerRepository.findBySubmissionAndQuestion(submission, question)
                .orElseGet(() -> {
                    Answer newAnswer = new Answer();
                    newAnswer.setSubmission(submission);
                    newAnswer.setQuestion(question);
                    return answerRepository.save(newAnswer);
                });

        // Xóa các lựa chọn cũ
        answerChoiceRepository.deleteByAnswer(answer);

        // Thêm các lựa chọn mới
        for (Integer choiceId : choiceIds) {
            Choice choice = choiceRepository.findById(choiceId)
                    .orElseThrow(() -> new EntityNotFoundException("Choice not found"));
            if (!choice.getQuestionBank().getId().equals(question.getQuestionBank().getId())) {
                throw new IllegalArgumentException("Choice id " + choiceId + " không thuộc câu hỏi id " + questionId);
            }
            AnswerChoice ac = new AnswerChoice(answer, choice);
            answerChoiceRepository.save(ac);
        }

        return answer;
    }
    private Submission getAndValidateSubmission(Integer submissionId, User user) {
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new EntityNotFoundException("Submission not found with id: " + submissionId));

        if (!submission.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Bạn không có quyền truy cập bài làm này.");
        }

        if (submission.getStatus() != null && submission.getStatus() == 1) {
            throw new IllegalStateException("Bài thi đã được nộp, không thể chỉnh sửa.");
        }

        return submission;
    }

}
