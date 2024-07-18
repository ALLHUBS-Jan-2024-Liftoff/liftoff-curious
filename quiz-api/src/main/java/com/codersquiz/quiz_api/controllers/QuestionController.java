package com.codersquiz.quiz_api.controllers;

import com.codersquiz.quiz_api.models.Question;
import com.codersquiz.quiz_api.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz-api/quizzes")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    // Endpoint to get a quiz with a specific number of questions for a topic
    @GetMapping
    public List<Question> getQuiz(@RequestParam Long topicId, @RequestParam int numQuestions) {
        return questionService.getQuestionsByTopicAndLimit(topicId, numQuestions);
    }
}