package com.HTTN.thitn.dto.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerRequest {

    private Integer submissionId;
    private Integer questionId;
    private Integer chosenChoiceId;
    private List<Integer> choiceIds;
}