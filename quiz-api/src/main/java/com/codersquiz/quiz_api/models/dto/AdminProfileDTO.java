package com.codersquiz.quiz_api.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AdminProfileDTO {

    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 20, message = "Name must be 3-20 characters long")
    private String name;

    @NotBlank(message = "Email is required")
    @Size(min = 10, max = 30, message = "Email must be 10-30 characters long")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 30, message = "Password must be 8-30 characters long")
    private String password;

    // Getters and Setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

