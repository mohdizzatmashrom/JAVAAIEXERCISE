package com.example.supportdesk.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = {
        "com.example.assettracker.repository",
        "com.example.supportdesk.repository"
})
public class MongoConfig {
}
