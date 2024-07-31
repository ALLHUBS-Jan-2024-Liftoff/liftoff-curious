package com.codersquiz.quiz_api.controllers;

import com.codersquiz.quiz_api.models.Comment;
import com.codersquiz.quiz_api.models.dto.CommentDTO;
import com.codersquiz.quiz_api.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    // List all comments by email
    @GetMapping("/by-email")
    public ResponseEntity<List<Comment>> getCommentsByEmail(@RequestParam String email) {
        List<Comment> comments = commentRepository.findByEmail(email);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    // List All Comments
    @GetMapping("/comments/all")
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentRepository.findAll();
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    // List Approved Comments
    @GetMapping("/comments")
    public ResponseEntity<List<Comment>> getApprovedComments() {
        List<Comment> comments = commentRepository.findByStatus(true);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    // Get Comment by ID
    @GetMapping("/comments/{commentId}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if (comment.isPresent()) {
            return new ResponseEntity<>(comment.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Create a New Comment
    @PostMapping("/comments")
    public ResponseEntity<CommentDTO> createComment(@RequestBody CommentDTO commentDTO) {
        // Convert DTO to Entity
        Comment comment = new Comment();
        comment.setContent(commentDTO.getContent());
        comment.setAuthorName(commentDTO.getAuthorName());
        comment.setEmail(commentDTO.getEmail());
        comment.setStatus(false);  // Default status for new comments

        // Save the entity
        Comment savedComment = commentRepository.save(comment);

        // Convert back to DTO
        CommentDTO savedCommentDTO = new CommentDTO(
                savedComment.getId(),
                savedComment.getContent(),
                savedComment.getAuthorName(),
                savedComment.getEmail(),
                savedComment.getStatus()
        );

        return new ResponseEntity<>(savedCommentDTO, HttpStatus.CREATED);
    }

    // Update an Existing Comment
    @PutMapping("/comments/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long commentId, @RequestBody Comment comment) {
        Optional<Comment> existingComment = commentRepository.findById(commentId);
        if (existingComment.isPresent()) {
            Comment updatedComment = existingComment.get();
            updatedComment.setContent(comment.getContent());
            updatedComment.setStatus(comment.getStatus());
            commentRepository.save(updatedComment);
            return new ResponseEntity<>(updatedComment, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete a Comment
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentRepository.deleteById(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}