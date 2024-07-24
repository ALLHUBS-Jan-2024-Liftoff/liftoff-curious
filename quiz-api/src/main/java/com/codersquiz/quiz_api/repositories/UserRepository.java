package com.codersquiz.quiz_api.repositories;


import com.codersquiz.quiz_api.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    //Optional<User> findById(Integer userId);
    Optional<User> findById(Long userId); // This is not needed as JpaRepository already provides this.
}
