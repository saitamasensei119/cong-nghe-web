package com.HTTN.thitn.mapper;

import com.HTTN.thitn.dto.Response.QuestionInExamResponse;
import com.HTTN.thitn.entity.Question;
import org.springframework.stereotype.Component;

@Component
public class QuestionMapper {

    public QuestionInExamResponse toResponse(Question question) {
        QuestionInExamResponse response = new QuestionInExamResponse();
        response.setId(question.getId());

        var qb = question.getQuestionBank();
        response.setQuestionBankId(qb.getId());
        response.setQuestionText(qb.getQuestionText());
        response.setQuestionType(qb.getQuestionType());
        response.setDifficulty(qb.getDifficulty());

        return response;
    }
}