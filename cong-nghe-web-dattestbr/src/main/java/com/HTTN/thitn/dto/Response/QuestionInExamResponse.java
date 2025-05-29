package com.HTTN.thitn.dto.Response;

import lombok.Data;

@Data
public class QuestionInExamResponse {
    private Long id;
    private Integer questionBankId;
    private String questionText;
    private Integer questionType;
    private Integer difficulty;
}