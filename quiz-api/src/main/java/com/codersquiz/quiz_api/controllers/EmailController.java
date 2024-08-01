package com.codersquiz.quiz_api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@RestController
@RequestMapping("/app/send-email")
@CrossOrigin(origins = "http://localhost:3000")
public class EmailController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping
    public String sendEmail(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("htmlContent") String htmlContent
    ) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(email);
        helper.setSubject("Quiz Feedback");
        helper.setText("Hi " + name + ",<br><br>Please find your quiz feedback below:<br><br>" + htmlContent + "<br><br>Best regards,<br>Quiz Coders<br>(The Team behind Coders' Quiz)", true);

        mailSender.send(message);

        return "Email sent successfully";
    }
}
