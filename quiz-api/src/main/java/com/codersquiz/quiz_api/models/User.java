package com.codersquiz.quiz_api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String username;

    @NotNull
    private String passwordHash;

    private String role;

    public User() {
    }

    public User(String username, String password, String role) {
        this.username = username;
        this.passwordHash = encoder.encode(password);
        this.role = role;
    }

//    //this is a constructor recommended by intellij for line 72 in AuthenticationController (constructor overloading)
    public User(String username, String password) {
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
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
