package com.codersquiz.quiz_api.repositories;

import com.codersquiz.quiz_api.models.Starter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StarterRepository extends JpaRepository<Starter, Long> {
}

