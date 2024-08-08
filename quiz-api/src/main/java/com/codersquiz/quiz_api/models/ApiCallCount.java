package com.codersquiz.quiz_api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ApiCallCount {
    @Id
    private String apiEndpoint;
    private long count;

    // Getters and Setters

    public String getApiEndpoint() {
        return apiEndpoint;
    }

    public void setApiEndpoint(String apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
