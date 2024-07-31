package com.codersquiz.quiz_api;

import com.codersquiz.quiz_api.controllers.AuthenticationController;
import com.codersquiz.quiz_api.models.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class AuthenticationFilter implements HandlerInterceptor {

    @Autowired
    AuthenticationController authenticationController;

    // Whitelist
    private static final List<String> whitelist = Arrays.asList("/", "/api", "/register", "/login", "/users/register", "/users/login", "/send-email");
    // NIL: come back and see if what this means
    // - so these are backend routes
    // - and it should be based on my controller @requestmapping path. so if it has users then include like /users/register and so on?

    private static boolean isWhitelisted(String path) {
        for (String pathRoot : whitelist) {
            if (path.equals("/") || path.startsWith(pathRoot)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        String requestURI = request.getRequestURI();
        String method = request.getMethod();
        System.out.println("Request URI: " + requestURI + ", Method: " + method); // Debug log

        if (isWhitelisted(requestURI)) {
            return true;
        }

        HttpSession session = request.getSession();
        User user = authenticationController.getUserFromSession(session);

        if (user != null) {
            System.out.println("User authenticated: " + user.getUsername()); // Debug log
            System.out.println("User role: " + user.getRole()); // Debug log
            return true;
        }

        System.out.println("User not authenticated, redirecting to login"); // Debug log
        response.sendRedirect("/login");
        // NIL: so this is backend route
        // But this does not mean backend template, it can correspond to front end routes
        // So, I need to create separate login and registration pages in front end
        // When response.sendRedirect("/login") is called, it should navigate to the frontend login page.
        // I need to ensure that my frontend is configured to handle this path correctly and present the login form.
        return false;
    }
}