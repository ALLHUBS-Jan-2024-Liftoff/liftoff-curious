package com.codersquiz.quiz_api.service;

import com.codersquiz.quiz_api.models.Question;
import com.codersquiz.quiz_api.repositories.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    // Fetch a limited number of questions by topic ID
    public List<Question> getQuestionsByTopicAndLimit(Long topicId, int numQuestions) {
        List<Question> questions = questionRepository.findByTopicId(topicId);
        Collections.shuffle(questions); // Shuffle to randomize the selection
        return questions.subList(0, Math.min(numQuestions, questions.size())); // Limit to requested number
    }
}