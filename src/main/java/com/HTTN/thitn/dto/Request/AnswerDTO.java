package com.HTTN.thitn.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerDTO {
    private Integer id;
    private Integer submissionId;
    private Integer questionId;
    private Integer chosenChoiceId;
}