package com.codersquiz.quiz_api.controllers;

import com.codersquiz.quiz_api.models.Starter;
import com.codersquiz.quiz_api.models.Topic;
import com.codersquiz.quiz_api.repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/quiz-api/topics")
public class TopicController {
    @Autowired
//    private TopicService topicService;
    private TopicRepository topicRepository;

    @GetMapping("/all")
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    @GetMapping("/{topicId}")
    public Topic getTopic(@PathVariable("topicId") Long topicId) {
        return topicRepository.findById(topicId).get();
    }

    @PostMapping
    public Topic createTopic(@RequestBody String name) {
        Topic newTopic = new Topic();
        newTopic.setName(name);
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

    @DeleteMapping("/{topicId}")
    public String deleteTopic(@PathVariable Long topicId) {
        topicRepository.deleteById(topicId);
        return "Topic deleted successfully";
    }
}