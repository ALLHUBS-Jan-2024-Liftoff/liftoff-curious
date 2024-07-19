package com.codersquiz.quiz_api.models;
import jakarta.persistence.*;

//Mark as a JPA entity
@Entity
public class Topic {
    //Primary key for entity & auto-generate its value
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    public Topic() {
    }

    public Topic(String name) {
        this.name = name;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
