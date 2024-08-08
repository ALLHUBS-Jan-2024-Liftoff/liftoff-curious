package com.codersquiz.quiz_api.models.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


public class CommentDTO {
    private Long id;

    @NotBlank(message = "Comment cannot be blank")
    @Column(columnDefinition = "TEXT")
    @Size(max = 1000, message = "Comment cannot exceed 1000 characters")
    private String content;

    @NotBlank(message = "Author name cannot be blank")
    @Size(max = 50, message = "Author name cannot exceed 50 characters")
    private String authorName;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    private String email;

    @NotNull(message = "Status cannot be null")
    private Boolean status;

    // Constructors
    public CommentDTO() {}

    public CommentDTO(Long id, String content, String authorName, String email, Boolean status) {
        this.id = id;
        this.content = content;
        this.authorName = authorName;
        this.email = email;
        this.status = status;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
