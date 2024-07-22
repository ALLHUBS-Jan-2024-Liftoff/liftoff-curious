package com.codersquiz.quiz_api.controllers;

import com.codersquiz.quiz_api.models.User;
import com.codersquiz.quiz_api.models.dto.LoginFormDTO;
import com.codersquiz.quiz_api.models.dto.RegistrationFormDTO;
import com.codersquiz.quiz_api.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/quiz/questions")
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    private static final String userSessionKey = "user";

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

    public User getUserFromSession(HttpSession session) {
        Long userId = (Long) session.getAttribute(userSessionKey); // Use Long instead of Integer
        if (userId == null) {
            return null;
        }
        Optional<User> userOpt = userRepository.findById(userId);
        return userOpt.orElse(null);
    }

    @GetMapping("/register")
    public ResponseEntity<Map<String, String>> displayRegistrationForm(Model model, HttpSession session) {
        model.addAttribute(new RegistrationFormDTO());
        Map<String, String> response = new HashMap<>();
        response.put("message", "register endpoint reached");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public String processRegistrationForm(@ModelAttribute @Valid RegistrationFormDTO registrationFormDTO, Errors errors, HttpServletRequest request) {
        if (errors.hasErrors()) {
            return "register";
        }

        Optional<User> existingUser = userRepository.findByUsername(registrationFormDTO.getUsername());
        if (existingUser.isPresent()) {
            errors.rejectValue("username", "username.alreadyExists", "A user with that username already exists");
            return "register";
        }

        String password = registrationFormDTO.getPassword();
        String verifyPassword = registrationFormDTO.getVerifyPassword();
        if (!password.equals(verifyPassword)) {
            errors.rejectValue("password", "password.mismatch", "Passwords do not match");
            return "register";
        }

        User newUser = new User(registrationFormDTO.getUsername(), registrationFormDTO.getPassword(), "ADMIN");
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);

        return "redirect:/admin";
    }

    @GetMapping("/login")
    public ResponseEntity<Map<String, String>> displayLoginForm(Model model, HttpSession session) {
        model.addAttribute(new LoginFormDTO());
        Map<String, String> response = new HashMap<>();
        response.put("message", "login endpoint reached");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public String processLoginForm(@ModelAttribute @Valid LoginFormDTO loginFormDTO, Errors errors, HttpServletRequest request) {
        if (errors.hasErrors()) {
            return "login";
        }

        Optional<User> theUserOpt = userRepository.findByUsername(loginFormDTO.getUsername());
        if (theUserOpt.isEmpty()) {
            errors.rejectValue("username", "login.invalid", "Credentials invalid. Please try again with correct username/password.");
            return "login";
        }

        User theUser = theUserOpt.get();
        String password = loginFormDTO.getPassword();
        if (!theUser.isMatchingPassword(password)) {
            errors.rejectValue("password", "login.invalid", "Credentials invalid. Please try again with correct username/password.");
            return "login";
        }

        setUserInSession(request.getSession(), theUser);
        return "redirect:/admin";
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return "redirect:/login";
    }
}