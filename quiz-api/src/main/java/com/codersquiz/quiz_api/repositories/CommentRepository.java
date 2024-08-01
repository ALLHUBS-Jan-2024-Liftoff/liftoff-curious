package com.codersquiz.quiz_api.repositories;

import com.codersquiz.quiz_api.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByAuthorName(String authorName);
    List<Comment> findByStatus(boolean status);
    Optional<Comment> findById(Long id);
    List<Comment> findByEmail(String email);

}