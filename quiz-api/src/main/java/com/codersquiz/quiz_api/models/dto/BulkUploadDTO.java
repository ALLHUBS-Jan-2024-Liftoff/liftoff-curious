package com.codersquiz.quiz_api.models.dto;

import java.util.List;

public class BulkUploadDTO {
    private List<QuestionUploadDTO> questions;

    public BulkUploadDTO() {}

    public BulkUploadDTO(List<QuestionUploadDTO> questions) {
        this.questions = questions;
    }

    public List<QuestionUploadDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionUploadDTO> questions) {
        this.questions = questions;
    }
}
