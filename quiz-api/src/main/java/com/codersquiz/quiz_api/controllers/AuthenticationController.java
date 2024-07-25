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
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/register")
    public ResponseEntity<String> processRegistrationForm(@RequestBody @Valid RegistrationFormDTO registrationFormDTO, Errors errors, HttpServletRequest request) {
        if (errors.hasErrors()) {
            logger.warning("Validation errors during registration: " + errors.toString());
            return new ResponseEntity<>("Validation errors", HttpStatus.BAD_REQUEST);
        }

        Optional<User> existingUser = userRepository.findByUsername(registrationFormDTO.getUsername());
        if (existingUser.isPresent()) {
            logger.warning("Attempt to register with an existing username: " + registrationFormDTO.getUsername());
            return new ResponseEntity<>("A user with that username already exists", HttpStatus.BAD_REQUEST);
        }

        String password = registrationFormDTO.getPassword();
        String verifyPassword = registrationFormDTO.getVerifyPassword();
        if (!password.equals(verifyPassword)) {
            logger.warning("Passwords do not match for user: " + registrationFormDTO.getUsername());
            return new ResponseEntity<>("Passwords do not match", HttpStatus.BAD_REQUEST);
        }

        // Use the role provided in the registration form, default to "USER" if not provided
        String role = registrationFormDTO.getRole() != null ? registrationFormDTO.getRole() : "USER";

        //System.out.println("I am here, role created");

        User newUser = new User(registrationFormDTO.getUsername(), registrationFormDTO.getPassword(), role);
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);
        logger.info("User registered successfully: " + newUser.getUsername());
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