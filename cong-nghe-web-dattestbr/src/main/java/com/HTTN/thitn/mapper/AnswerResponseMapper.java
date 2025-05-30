package com.HTTN.thitn.mapper;
import com.HTTN.thitn.dto.Response.AnswerResponse;
import com.HTTN.thitn.dto.Response.ChoiceResponse;
import com.HTTN.thitn.entity.Answer;
import com.HTTN.thitn.entity.AnswerChoice;
import com.HTTN.thitn.entity.Choice;

import java.util.List;
import java.util.stream.Collectors;

public class AnswerResponseMapper {

    public static AnswerResponse toResponse(Answer answer) {
        AnswerResponse response = new AnswerResponse();

        response.setAnswerId(answer.getId());
        response.setQuestionId(answer.getQuestion().getId());
        response.setSubmissionId(answer.getSubmission().getId());

        if (answer.getChosenChoice() != null) {
            response.setChosenChoice(new ChoiceResponse(answer.getChosenChoice()));
        }

        // Lấy danh sách selectedChoices từ method getSelectedChoices()
        List<Choice> selectedChoicesEntity = answer.getSelectedChoices();
        if (selectedChoicesEntity != null && !selectedChoicesEntity.isEmpty()) {
            List<ChoiceResponse> selectedChoices = selectedChoicesEntity.stream()
                    .map(ChoiceResponse::new)  // dùng constructor nhận entity Choice
                    .collect(Collectors.toList());
            response.setSelectedChoices(selectedChoices);
        }

        return response;
    }

}
