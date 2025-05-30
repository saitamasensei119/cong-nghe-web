package com.HTTN.thitn.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "answer_choices")
@Data
public class AnswerChoice {
    @EmbeddedId
    private AnswerChoiceId id;

    @ManyToOne
    @MapsId("answerId")
    @JoinColumn(name = "answer_id")
    @JsonBackReference
    private Answer answer;

    @ManyToOne
    @MapsId("choiceId")
    @JoinColumn(name = "choice_id")
    private Choice choice;
    public AnswerChoice() {}

    public AnswerChoice(Answer answer, Choice choice) {
        this.answer = answer;
        this.choice = choice;
        this.id = new AnswerChoiceId(answer.getId(), choice.getId());
    }

}

