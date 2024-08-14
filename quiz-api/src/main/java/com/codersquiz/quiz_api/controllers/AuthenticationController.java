package com.codersquiz.quiz_api.controllers;

import com.codersquiz.quiz_api.models.User;
import com.codersquiz.quiz_api.models.dto.LoginFormDTO;
import com.codersquiz.quiz_api.models.dto.RegistrationFormDTO;
import com.codersquiz.quiz_api.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

//@RequestMapping("/users") // it should also not be quiz/questions because it is not related to questions
// because the AuthenticationFilter allows /login, /register, that is why the @requestmapping should be blank path.
// Also perhaps this is not needed if there is no common parent path...
@RestController
@RequestMapping("/users")
//@CrossOrigin(origins = "http://localhost:3000") // Allow requests from the frontend
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
    // Registration
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> processRegistrationForm(@RequestBody @Valid RegistrationFormDTO registrationFormDTO, Errors errors, HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();
        if (errors.hasErrors()) {
            response.put("message", "Validation errors");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        Optional<User> existingUser = userRepository.findByUsername(registrationFormDTO.getUsername());
        if (existingUser.isPresent()) {
            response.put("message", "A user with that username already exists");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        String password = registrationFormDTO.getPassword();
        String verifyPassword = registrationFormDTO.getVerifyPassword();
        if (!password.equals(verifyPassword)) {
            response.put("message", "Passwords do not match");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        final String secretCodeHash = "$2a$10$K/H.Q2bxavTg1x4jkDNMwO.vsMKgCQzin1n3uQU1TlkwsUz6grhjS";
        String secretCode = registrationFormDTO.getSecretCode();
        final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        boolean didMatch = encoder.matches(secretCode, secretCodeHash);
        if (!didMatch) {
            response.put("message", "Secret Code does not match");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        String role = registrationFormDTO.getRole() != null ? registrationFormDTO.getRole() : "USER";
        User newUser = new User(registrationFormDTO.getName(), registrationFormDTO.getEmail(), registrationFormDTO.getUsername(), registrationFormDTO.getPassword(), role);
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);

        response.put("message", "User registered successfully");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> processLoginForm(@RequestBody @Valid LoginFormDTO loginFormDTO, Errors errors, HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();
        if (errors.hasErrors()) {
            response.put("message", "Validation errors");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        Optional<User> theUserOpt = userRepository.findByUsername(loginFormDTO.getUsername());
        if (theUserOpt.isEmpty()) {
            response.put("message", "Credentials invalid");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        User theUser = theUserOpt.get();
        String password = loginFormDTO.getPassword();
        if (!theUser.isMatchingPassword(password)) {
            response.put("message", "Credentials invalid");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        setUserInSession(request.getSession(), theUser);

        // logging for testing purpose only
        System.out.println("The user's Session ID is: " + request.getSession().getId());

        response.put("message", "User logged in successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // Logout the User
    // removed the Get mapping
    // Because Post is the right method for logout
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate();
        // Clear the security context
        SecurityContextHolder.clearContext();
        return new ResponseEntity<>("User logged out successfully", HttpStatus.OK);
    }

    // Protected Endpoint - this is probably not needed, but keeping it to test the actual logout and login status
    @GetMapping("/protected")
    public ResponseEntity<String> protectedEndpoint() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated() && !(authentication.getPrincipal() instanceof String && authentication.getPrincipal().equals("anonymousUser"))) {
            return new ResponseEntity<>("This is a protected route", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User is not authenticated", HttpStatus.UNAUTHORIZED);
        }
    }
}