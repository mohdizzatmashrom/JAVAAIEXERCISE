package com.example.assettracker.config;

import com.example.assettracker.model.AppUser;
import com.example.assettracker.repository.AppUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class UserDataSeeder {

    private static final Logger logger = LoggerFactory.getLogger(UserDataSeeder.class);

    @Bean
    CommandLineRunner seedUsers(AppUserRepository appUserRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            createUserIfMissing(
                    appUserRepository,
                    passwordEncoder,
                    "Admin User",
                    "admin@example.com",
                    "Admin@12345",
                    "ADMIN"
            );
        };
    }

    private void createUserIfMissing(
            AppUserRepository appUserRepository,
            PasswordEncoder passwordEncoder,
            String name,
            String email,
            String rawPassword,
            String role) {

        if (appUserRepository.existsByEmailIgnoreCase(email)) {
            logger.info("Seed user already exists: {}", email);
            return;
        }

        AppUser user = new AppUser(
                name,
                email.toLowerCase(),
                passwordEncoder.encode(rawPassword),
                role
        );

        appUserRepository.save(user);
        logger.info("Seeded user email={} role={}", user.getEmail(), user.getRole());
    }
}
