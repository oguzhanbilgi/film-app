package com.film_app.config;

import com.film_app.entity.User;
import com.film_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class DataInitializer implements CommandLineRunner {
    
    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public void run(String... args) throws Exception {
        try {
            logger.info("Starting data initialization...");
            
            // Create test users if they don't exist
            if (userRepository.count() == 0) {
                logger.info("No users found, creating test users...");
                
                User user1 = new User();
                user1.setUsername("testuser1");
                user1.setEmail("testuser1@example.com");
                userRepository.save(user1);
                logger.info("Created user: testuser1");
                
                User user2 = new User();
                user2.setUsername("testuser2");
                user2.setEmail("testuser2@example.com");
                userRepository.save(user2);
                logger.info("Created user: testuser2");
                
                logger.info("Test users created successfully!");
            } else {
                logger.info("Users already exist, skipping user creation.");
            }
            
            logger.info("Data initialization completed successfully!");
            
        } catch (Exception e) {
            logger.error("Error during data initialization: ", e);
            throw e;
        }
    }
} 