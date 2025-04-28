package com.ctdat.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionBankDTO {
    private Integer id;
    private Integer subjectId;
    private String questionText;
    private String questionType;
    private Integer difficulty;
    private Integer createdById;
}
