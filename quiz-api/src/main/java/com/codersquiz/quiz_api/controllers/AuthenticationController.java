package com.codersquiz.quiz_api.controllers;

import com.codersquiz.quiz_api.models.User;
import com.codersquiz.quiz_api.models.dto.LoginFormDTO;
import com.codersquiz.quiz_api.models.dto.RegistrationFormDTO;
import com.codersquiz.quiz_api.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/quiz-api/authentication")
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    private static final String userSessionKey = "user";

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

    // Make sure I'm not working with data that doesn't exist
    public User getUserFromSession(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return null;
        }
        return userOpt.get();
    }

    @GetMapping("/register")
    public String displayRegistrationForm(Model model, HttpSession session) {
        model.addAttribute(new RegistrationFormDTO());
        // TODO: send value of loggedIn boolean
        model.addAttribute("loggedIn", session.getAttribute(userSessionKey) != null);
        return "register";
    }

    @PostMapping("/register")
    public String processRegistrationForm(@ModelAttribute @Valid RegistrationFormDTO registrationFormDTO, Errors errors, HttpServletRequest request) {
        // Send user back to the form if errors are found
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

        //Assume all registration users are Admins
        // Save new username & password, start a new session, and redirect to the home page
        User newUser = new User(registrationFormDTO.getUsername(), registrationFormDTO.getPassword(), "ADMIN");
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);
        return "redirect:/all"; // I'm not sure where to redirect them to, so I chose all
    }

    @GetMapping("/login")
    public String displayLoginForm(Model model, HttpSession session) {
        model.addAttribute(new LoginFormDTO()); //loginFormDTO
        // TODO: send value of loggedIn boolean
        model.addAttribute("loggedIn", session.getAttribute(userSessionKey) != null);

        return "login";
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


        // Redirect based on role
        if (theUser.getRole().equals("ADMIN")) {
            return "redirect:/admin/control-panel"; // Adjust URL as needed
        } else {
            return "redirect:/user/dashboard"; // Adjust URL as needed
        }
    }

    @GetMapping("/admin/control-panel")
    public String displayAdminControlPanel(HttpSession session) {
        User loggedInUser = getUserFromSession(session);

        if (loggedInUser == null || !loggedInUser.getRole().equals("ADMIN")) {
            return "redirect:/login"; // Redirect to login if not an admin
        }

        return "admin/control-panel"; // Return the view for admin control panel
    }

}