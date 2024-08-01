package com.codersquiz.quiz_api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private String authorName; // Display name of the user
    private String email;      // Email of the user who made the comment
    //private LocalDateTime createdAt;
    private Boolean status;    // true for approved, false for not approved

    // No-argument constructor
    public Comment() {}

   //Constructor

    public Comment(String content, String authorName, String email, Boolean status) {
        this.content = content;
        this.authorName = authorName;
        this.email = email;
        //this.createdAt = createdAt;
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

//    public LocalDateTime getCreatedAt() {
//        return createdAt;
//    }

//    public void setCreatedAt(LocalDateTime createdAt) {
//        this.createdAt = createdAt;
//    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}




