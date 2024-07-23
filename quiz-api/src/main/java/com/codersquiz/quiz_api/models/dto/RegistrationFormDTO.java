package com.codersquiz.quiz_api.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RegistrationFormDTO extends LoginFormDTO {

    @NotNull(message = "Password verification is required")
    @NotBlank(message = "Password verification is required")
    @Size(min = 8, max = 30, message = "Password verification must be 8-30 characters long")
    private String verifyPassword;

    private String role;

    public String getVerifyPassword() {
        return verifyPassword;
    }

    public void setVerifyPassword(String verifyPassword) {
        this.verifyPassword = verifyPassword;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}