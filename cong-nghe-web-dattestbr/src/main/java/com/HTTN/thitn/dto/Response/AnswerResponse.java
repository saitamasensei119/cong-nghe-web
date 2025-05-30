package com.HTTN.thitn.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerResponse {
    private Integer answerId;
    private Long questionId;
    private Integer submissionId;

    private ChoiceResponse chosenChoice;

    private List<ChoiceResponse> selectedChoices;
}
