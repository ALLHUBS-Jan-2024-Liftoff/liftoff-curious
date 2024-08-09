package com.codersquiz.quiz_api.repositories;

import com.codersquiz.quiz_api.models.ApiCallCount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApiCallCountRepository extends JpaRepository<ApiCallCount, String> {
}
