package com.codersquiz.quiz_api.controllers;

import com.codersquiz.quiz_api.exceptions.ResourceNotFoundException;
import com.codersquiz.quiz_api.models.Question;
import com.codersquiz.quiz_api.models.Topic;
import com.codersquiz.quiz_api.repositories.QuestionRepository;
import com.codersquiz.quiz_api.repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/quiz-api/questions")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private TopicRepository topicRepository;

    @GetMapping("/all")
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @GetMapping("/{questionId}")
    public Question getQuestion(@PathVariable("questionId") Long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        if (optionalQuestion.isPresent()) {
            return optionalQuestion.get();
        } else {
            throw new ResourceNotFoundException("Question not found with id = " + questionId);
        }
    }

    @PostMapping
    public Question createQuestion(@RequestBody Question newQuestion) {
        return questionRepository.save(newQuestion);
    }

    //NEW BULK ADD
    @PostMapping("/bulkadd")
    public List<Question> bulkAddQuestion(@RequestBody List<Question> questions) {
        // Iterate over each question in the list & save it to the repository
        for (Question question : questions) {
            questionRepository.save(question);
        }
        // Return the list of saved questions
        return questions;
    }

    @PutMapping("/{questionId}")
    public Question updateQuestion(@PathVariable Long questionId, @RequestBody Question questionDetails) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        if (optionalQuestion.isPresent()) {
            Question questionToEdit = optionalQuestion.get();
            questionToEdit.setContent(questionDetails.getContent());
            questionToEdit.setAnswer(questionDetails.getAnswer());
            questionToEdit.setOptionA(questionDetails.getOptionA());
            questionToEdit.setOptionB(questionDetails.getOptionB());
            questionToEdit.setOptionC(questionDetails.getOptionC());
            questionToEdit.setOptionD(questionDetails.getOptionD());
            questionToEdit.setTopic(questionDetails.getTopic());
            return questionRepository.save(questionToEdit);
        } else {
            throw new ResourceNotFoundException("Question not found with id = " + questionId);
        }
    }

    @DeleteMapping("/{topicId}")
    public ResponseEntity<String> deleteTopic(@PathVariable Long topicId) {
        Optional<Topic> optionalTopic = topicRepository.findById(topicId);
        if (optionalTopic.isPresent()) {
            List<Question> linkedQuestions = questionRepository.findByTopicId(topicId);
            if (!linkedQuestions.isEmpty()) {
                return new ResponseEntity<>("Cannot delete topic. There are questions linked to this topic.", HttpStatus.BAD_REQUEST);
            }
            topicRepository.deleteById(topicId);
            return new ResponseEntity<>("Topic deleted successfully", HttpStatus.OK);
        } else {
            throw new ResourceNotFoundException("Topic not found with id " + topicId);
        }
    }

    @GetMapping
    public ResponseEntity<List<Question>> getQuestionsByTopicAndNumber(@RequestParam Long topic, @RequestParam int numq) {
        List<Question> questions = questionRepository.findByTopicId(topic);
        if (questions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Collections.shuffle(questions);
        List<Question> selectedQuestions = questions.stream().limit(numq).collect(Collectors.toList());
        return new ResponseEntity<>(selectedQuestions, HttpStatus.OK);
    }
}