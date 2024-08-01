package com.codersquiz.quiz_api.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    private String username;

    @NotNull
    private String passwordHash;

    private String role;

    public User() {}

    public User(String name, String email, String username, String password, String role) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.passwordHash = encoder.encode(password);
        this.role = role;
    }

    // Overloaded constructor to directly set hashed password
    public User(String name, String email, String username, String passwordHash, String role, boolean isHashed) {
        this.name = name;
        this.email = email;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
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