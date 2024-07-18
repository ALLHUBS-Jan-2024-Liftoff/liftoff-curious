//package com.codersquiz.quiz_api.service;
//
//import com.codersquiz.quiz_api.models.Topic;
//import com.codersquiz.quiz_api.repositories.TopicRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class TopicService {
//    @Autowired
//    private TopicRepository topicRepository;
//
//    public List<Topic> getAllTopics() {
//        return topicRepository.findAll();
//    }
//
//    public Topic getTopicById(Long id) {
//        return topicRepository.findById(id).orElse(null);
//    }
//
//    public Topic addTopic(Topic topic) {
//        return topicRepository.save(topic);
//    }
//
//    public Topic updateTopic(Long id, Topic topic) {
//        topic.setId(id);
//        return topicRepository.save(topic);
//    }
//
//    public void deleteTopic(Long id) {
//        topicRepository.deleteById(id);
//    }
//}
