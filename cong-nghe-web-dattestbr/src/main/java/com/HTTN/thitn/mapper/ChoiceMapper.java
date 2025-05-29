package com.HTTN.thitn.mapper;

import com.HTTN.thitn.dto.Request.ChoiceRequest;
import com.HTTN.thitn.dto.Response.ChoiceResponse;
import com.HTTN.thitn.entity.Choice;
import org.springframework.stereotype.Component;

@Component
public class ChoiceMapper {

    public Choice toEntity(ChoiceRequest request) {
        Choice choice = new Choice();
        choice.setChoiceText(request.getChoiceText());
        choice.setIsCorrect(request.getIsCorrect());
        return choice;
    }

    public ChoiceResponse toResponse(Choice choice) {
        ChoiceResponse response = new ChoiceResponse();
        response.setId(choice.getId());
        response.setChoiceText(choice.getChoiceText());
        response.setIsCorrect(choice.getIsCorrect());
        return response;
    }
    public ChoiceResponse toStudentResponse(Choice choice) {
        return new ChoiceResponse(choice.getId(), choice.getChoiceText(), null); // ẩn đáp án đúng
    }

}
