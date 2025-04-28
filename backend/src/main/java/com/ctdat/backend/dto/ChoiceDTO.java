package com.ctdat.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChoiceDTO {
    private Integer id;
    private Integer questionBankId;
    private String choiceText;
    private Boolean isCorrect;
}