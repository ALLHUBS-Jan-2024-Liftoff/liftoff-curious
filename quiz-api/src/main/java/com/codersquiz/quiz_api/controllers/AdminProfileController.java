package com.codersquiz.quiz_api.controllers;

import com.codersquiz.quiz_api.models.User;
import com.codersquiz.quiz_api.models.dto.AdminProfileDTO;
import com.codersquiz.quiz_api.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/adminprofile")
public class AdminProfileController {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping("/{username}")
    public ResponseEntity<AdminProfileDTO> getAdminProfile(@PathVariable String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            AdminProfileDTO adminProfileDTO = new AdminProfileDTO();
            adminProfileDTO.setName(user.getName());
            adminProfileDTO.setEmail(user.getEmail());
            // Do not return password for security reasons
            // So while the user would just see name and email fields when does a GET request
            // the form for the Post request may have an additional password field (where new password can be added)
            return ResponseEntity.ok(adminProfileDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{username}")
    public ResponseEntity<Void> updateAdminProfile(@PathVariable String username, @Valid @RequestBody AdminProfileDTO adminProfileDTO) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setName(adminProfileDTO.getName());
            user.setEmail(adminProfileDTO.getEmail());
            user.setPasswordHash(passwordEncoder.encode(adminProfileDTO.getPassword()));
            userRepository.save(user);
            System.out.println("User profile is updated with new details :)");
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

