package com.codersquiz.quiz_api.controllers;

import com.codersquiz.quiz_api.models.User;
import com.codersquiz.quiz_api.models.dto.LoginFormDTO;
import com.codersquiz.quiz_api.models.dto.RegistrationFormDTO;
import com.codersquiz.quiz_api.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/quiz/questions")
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    private static final String userSessionKey = "user";
    private static final Logger logger = Logger.getLogger(AuthenticationController.class.getName());

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

    // Get User From Session
    public User getUserFromSession(HttpSession session) {
        Long userId = (Long) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }
        Optional<User> userOpt = userRepository.findById(userId);
        return userOpt.orElse(null);
    }

    // Process Registration Form for Web UI
    @PostMapping("/register")
    public ResponseEntity<String> processRegistrationForm(@RequestBody @Valid RegistrationFormDTO registrationFormDTO, Errors errors, HttpServletRequest request) {
        if (errors.hasErrors()) {
            return new ResponseEntity<>("Validation errors", HttpStatus.BAD_REQUEST);
        }

        Optional<User> existingUser = userRepository.findByUsername(registrationFormDTO.getUsername());
        if (existingUser.isPresent()) {
            return new ResponseEntity<>("A user with that username already exists", HttpStatus.BAD_REQUEST);
        }

        String password = registrationFormDTO.getPassword();
        String verifyPassword = registrationFormDTO.getVerifyPassword();
        if (!password.equals(verifyPassword)) {
            return new ResponseEntity<>("Passwords do not match", HttpStatus.BAD_REQUEST);
        }

        // Use the role provided in the registration form, default to "USER" if not provided
        String role = registrationFormDTO.getRole() != null ? registrationFormDTO.getRole() : "USER";

        User newUser = new User(registrationFormDTO.getUsername(), registrationFormDTO.getPassword(), role);
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    // Process Login Form for Web UI
    @PostMapping("/login")
    public ResponseEntity<String> processLoginForm(@RequestBody @Valid LoginFormDTO loginFormDTO, Errors errors, HttpServletRequest request) {
        if (errors.hasErrors()) {
            return new ResponseEntity<>("Validation errors", HttpStatus.BAD_REQUEST);
        }

        Optional<User> theUserOpt = userRepository.findByUsername(loginFormDTO.getUsername());
        if (theUserOpt.isEmpty()) {
            return new ResponseEntity<>("Credentials invalid", HttpStatus.UNAUTHORIZED);
        }

        User theUser = theUserOpt.get();
        String password = loginFormDTO.getPassword();
        if (!theUser.isMatchingPassword(password)) {
            return new ResponseEntity<>("Credentials invalid", HttpStatus.UNAUTHORIZED);
        }

        setUserInSession(request.getSession(), theUser);
        return new ResponseEntity<>("User logged in successfully", HttpStatus.OK);
    }

    // Logout the User
    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return new ResponseEntity<>("User logged out successfully", HttpStatus.OK);
    }

    // Protected Endpoint
    @GetMapping("/protected")
    public ResponseEntity<String> protectedEndpoint() {
        return new ResponseEntity<>("This is a protected route", HttpStatus.OK);
    }
}