package com.film_app.config;

import com.film_app.entity.User;
import com.film_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if test users already exist
        if (userRepository.count() == 0) {
            // Create test users
            User user1 = new User();
            user1.setUsername("testuser1");
            user1.setEmail("testuser1@example.com");
            userRepository.save(user1);

            User user2 = new User();
            user2.setUsername("testuser2");
            user2.setEmail("testuser2@example.com");
            userRepository.save(user2);

            System.out.println("✅ Test users created successfully!");
            System.out.println("📊 Total users in database: " + userRepository.count());
        } else {
            System.out.println("📊 Database already contains " + userRepository.count() + " users");
        }
    }
} 