package com.codersquiz.quiz_api.controllers;

import com.codersquiz.quiz_api.models.Starter;
import com.codersquiz.quiz_api.repositories.StarterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/starters")
public class StarterController {

    @Autowired
    private StarterRepository starterRepository;

    @GetMapping("/all")
    public List<Starter> getAllStarters(){
        return starterRepository.findAll();
    }

    @GetMapping("/{starterId}")
    public Starter getStarter(@PathVariable("starterId") Long starterId) {
        return starterRepository.findById(starterId).get();
    }

    @PostMapping("/new")
    public Starter createStarter(@RequestParam String message){
        Starter newStarter = new Starter();
        newStarter.setMessage(message);
        return starterRepository.save(newStarter);
    }

    @PutMapping("/update")
    public Starter updateStarter(@RequestBody Starter starter) {
        return starterRepository.save(starter);
    }

    @DeleteMapping("/delete/{starterId}")
    public String deleteStarter(@PathVariable("starterId") Long starterId) {
        starterRepository.deleteById(starterId);
        return "Starter deleted successfully";
    }
}

