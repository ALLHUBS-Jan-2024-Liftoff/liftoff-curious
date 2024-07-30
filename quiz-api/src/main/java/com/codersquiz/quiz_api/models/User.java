package com.codersquiz.quiz_api.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @NotNull
    private String username;

    @NotNull
    private String passwordHash;

    private String role;

    public User() {}

    public User(String name, String username, String password, String role) {
        this.name = name;
        this.username = username;
        this.passwordHash = encoder.encode(password);
        this.role = role;
    }

    // Overloaded constructor to directly set hashed password
    public User(String name, String username, String passwordHash, String role, boolean isHashed) {
        this.name = name;
        this.username = username;
        this.passwordHash = isHashed ? passwordHash : encoder.encode(passwordHash);
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, passwordHash);
    }
}