//package com.codersquiz.quiz_api.controllers;
//
//import com.codersquiz.quiz_api.models.Topic;
//import com.codersquiz.quiz_api.service.TopicService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/quiz-api/topics")
//public class TopicController {
//    @Autowired
//    private TopicService topicService;
//
//    @GetMapping("/all")
//    public List<Topic> getAllTopics() {
//        return topicService.getAllTopics();
//    }
//
//    @GetMapping("/{topicId}")
//    public Topic getTopic(@PathVariable("topicId") Long topicId) {
//        return topicService.getTopicById(topicId);
//    }
//
//    @PostMapping
//    public Topic createTopic(@RequestBody Topic topic) {
//        return topicService.addTopic(topic);
//    }
//
//    @PutMapping("/{topicId}")
//    public Topic updateTopic(@PathVariable Long topicId, @RequestBody Topic topic) {
//        return topicService.updateTopic(topicId, topic);
//    }
//
//    @DeleteMapping("/{topicId}")
//    public String deleteTopic(@PathVariable Long topicId) {
//        topicService.deleteTopic(topicId);
//        return "Topic deleted successfully";
//    }
//}