package com.example.assettracker;

/*
 * AssetTrackerApplication
 * -----------------------
 * This is the entry point of a Spring Boot application.
 * - @SpringBootApplication tells Spring to enable auto-configuration,
 *   component scanning, and to treat this as the main configuration class.
 * - The main method delegates to SpringApplication.run which starts the
 *   embedded web server, creates the application context, and wires up
 *   components (controllers, services, repositories, etc.).
 *
 * Students: Think of this class as "turning on" the Spring framework
 * for this project. You normally won't change much here when learning.
 */

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.example.assettracker", "com.example.supportdesk"})
public class AssetTrackerApplication {

    // The JVM starts here. SpringApplication.run boots the whole app.
    public static void main(String[] args) {
        SpringApplication.run(AssetTrackerApplication.class, args);
    }
}
