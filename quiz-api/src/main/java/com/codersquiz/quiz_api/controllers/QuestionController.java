package com.codersquiz.quiz_api.controllers;

import com.codersquiz.quiz_api.exceptions.ResourceNotFoundException;
import com.codersquiz.quiz_api.models.ApiCallCount;
import com.codersquiz.quiz_api.models.Question;
import com.codersquiz.quiz_api.models.Topic;
import com.codersquiz.quiz_api.models.dto.BulkUploadDTO;
import com.codersquiz.quiz_api.models.dto.QuestionUploadDTO;
import com.codersquiz.quiz_api.repositories.ApiCallCountRepository;
import com.codersquiz.quiz_api.repositories.QuestionRepository;
import com.codersquiz.quiz_api.repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    @Autowired
    private ApiCallCountRepository apiCallCountRepository;

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
    public ResponseEntity<Question> createQuestion(@RequestBody QuestionUploadDTO questionDTO) {
        Optional<Topic> optionalTopic = topicRepository.findById(questionDTO.getTopicId());
        if (optionalTopic.isPresent()) {
            Topic topic = optionalTopic.get();
            Question newQuestion = new Question(
                    questionDTO.getContent(),
                    questionDTO.getAnswer(),
                    questionDTO.getOptionA(),
                    questionDTO.getOptionB(),
                    questionDTO.getOptionC(),
                    questionDTO.getOptionD(),
                    topic
            );
            Question savedQuestion = questionRepository.save(newQuestion);
            return new ResponseEntity<>(savedQuestion, HttpStatus.CREATED);
        } else {
            throw new ResourceNotFoundException("Topic not found with id " + questionDTO.getTopicId());
        }
    }

    @PostMapping("/bulk-upload")
    public ResponseEntity<String> bulkUploadQuestions(@RequestBody BulkUploadDTO bulkUploadDTO) {
        List<QuestionUploadDTO> questionDTOs = bulkUploadDTO.getQuestions();
        List<Question> questions = new ArrayList<>();

        for (QuestionUploadDTO dto : questionDTOs) {
            Optional<Topic> optionalTopic = topicRepository.findById(dto.getTopicId());
            if (optionalTopic.isPresent()) {
                Topic topic = optionalTopic.get();
                Question question = new Question(dto.getContent(), dto.getAnswer(), dto.getOptionA(), dto.getOptionB(), dto.getOptionC(), dto.getOptionD(), topic);
                questions.add(question);
            }
        }

        questionRepository.saveAll(questions);
        return new ResponseEntity<>("Questions uploaded successfully", HttpStatus.OK);
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

            Optional<Topic> optionalTopic = topicRepository.findById(questionDetails.getTopic().getId());
            if (optionalTopic.isPresent()) {
                questionToEdit.setTopic(optionalTopic.get());
            } else {
                throw new ResourceNotFoundException("Topic not found with id = " + questionDetails.getTopic().getId());
            }

            return questionRepository.save(questionToEdit);
        } else {
            throw new ResourceNotFoundException("Question not found with id = " + questionId);
        }
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        if (optionalQuestion.isPresent()) {
            questionRepository.deleteById(questionId);
            return new ResponseEntity<>("Question deleted successfully", HttpStatus.OK);
        } else {
            throw new ResourceNotFoundException("Question not found with id " + questionId);
        }
    }

    @DeleteMapping("/bulk-delete")
    public ResponseEntity<String> bulkDeleteQuestions(@RequestBody List<Long> questionIds) {
        List<Question> questionsToDelete = questionRepository.findAllById(questionIds);
        if (questionsToDelete.isEmpty()) {
            return new ResponseEntity<>("No questions found for the provided IDs", HttpStatus.NOT_FOUND);
        }
        questionRepository.deleteAll(questionsToDelete);
        return new ResponseEntity<>("Questions deleted successfully", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Question>> getQuestionsByTopicAndNumber(@RequestParam Long topic, @RequestParam int numq) {
        List<Question> questions = questionRepository.findByTopicId(topic);
        if (questions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Collections.shuffle(questions);
        List<Question> selectedQuestions = questions.stream().limit(numq).collect(Collectors.toList());

        // Add code to count the requests
        String endpoint = "/quiz-api/get";
        ApiCallCount apiCallCount = apiCallCountRepository.findById(endpoint).orElse(new ApiCallCount());
        apiCallCount.setApiEndpoint(endpoint);
        apiCallCount.setCount(apiCallCount.getCount() + 1);
        apiCallCountRepository.save(apiCallCount);

        return new ResponseEntity<>(selectedQuestions, HttpStatus.OK);
    }

    @GetMapping("/requestcount")
    public Long getRequestCount() {
        String endpoint = "/quiz-api/get";
        return apiCallCountRepository.findById(endpoint).map(ApiCallCount::getCount).orElse(0L);
    }
}
