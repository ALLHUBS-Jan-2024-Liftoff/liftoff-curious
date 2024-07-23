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

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/quiz-api/topics")
public class TopicController {


    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private QuestionRepository questionRepository;


    @GetMapping("/all")
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }


    @GetMapping("/{topicId}")
    public Topic getTopic(@PathVariable("topicId") Long topicId) {
        Optional<Topic> optionalTopic = topicRepository.findById(topicId);
        if (optionalTopic.isPresent()) {
            return optionalTopic.get();
        } else {
            throw new ResourceNotFoundException("Topic not found with id " + topicId);
        }
    }


    @PostMapping
    public Topic createTopic(@RequestBody Topic newTopic) {
        return topicRepository.save(newTopic);
    }

    @PutMapping("/{topicId}")
    public Topic updateTopic(@PathVariable Long topicId, @RequestBody Topic topicDetails) {
        Optional<Topic> optionalTopic = topicRepository.findById(topicId);
        if (optionalTopic.isPresent()) {
            Topic topicToEdit = optionalTopic.get();
            topicToEdit.setName(topicDetails.getName());
            return topicRepository.save(topicToEdit);
        } else {
            return topicRepository.save(topicDetails);
        }
    }


//    @DeleteMapping("/{topicId}")
//    public String deleteTopic(@PathVariable Long topicId) {
//        Optional<Topic> optionalTopic = topicRepository.findById(topicId);
//        if (optionalTopic.isPresent()) {
//            topicRepository.deleteById(topicId);
//            return "Topic deleted successfully";
//        } else {
//            throw new ResourceNotFoundException("Topic not found with id " + topicId);
//        }
//    }

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


}