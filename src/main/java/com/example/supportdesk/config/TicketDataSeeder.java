package com.example.supportdesk.config;

import com.example.supportdesk.model.Ticket;
import com.example.supportdesk.repository.TicketRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class TicketDataSeeder {

    @Bean
    CommandLineRunner seedTickets(TicketRepository ticketRepository) {
        return args -> {
            if (ticketRepository.count() > 0) {
                ticketRepository.deleteAll();
            }

            ticketRepository.save(new Ticket(
                    "Login page not loading",
                    "Users report the login page shows a blank screen on Chrome.",
                    "Bug",
                    "HIGH",
                    "OPEN",
                    "ali@example.com",
                    LocalDateTime.now().minusDays(3)
            ));

            ticketRepository.save(new Ticket(
                    "Add dark mode",
                    "Request to add dark mode theme for the dashboard.",
                    "Feature Request",
                    "Medium",
                    "OPEN",
                    "sit@example.com",
                    LocalDateTime.now().minusDays(1)
            ));

            ticketRepository.save(new Ticket(
                    "Update user guide",
                    "User guide needs to reflect the latest UI changes.",
                    "Documentation",
                    "Low",
                    "Closed",
                    "mutu@example.com",
                    LocalDateTime.now().minusDays(7)
            ));

            ticketRepository.save(new Ticket(
                    "Email server down",
                    "Outgoing emails are bouncing with SMTP timeout error.",
                    "Email",
                    "HIGH",
                    "OPEN",
                    "admin@example.com",
                    LocalDateTime.now().minusDays(2)
            ));

            ticketRepository.save(new Ticket(
                    "Email notifications not sent",
                    "Password reset emails are not being delivered.",
                    "Email",
                    "HIGH",
                    "OPEN",
                    "support@example.com",
                    LocalDateTime.now().minusHours(12)
            ));

            ticketRepository.save(new Ticket(
                    "Slow dashboard loading",
                    "Dashboard takes over 10 seconds to load with large datasets.",
                    "Bug",
                    "Medium",
                    "OPEN",
                    "bob@example.com",
                    LocalDateTime.now().minusDays(5)
            ));

            ticketRepository.save(new Ticket(
                    "Add export to CSV",
                    "Users need to export ticket data to CSV format.",
                    "Feature Request",
                    "Low",
                    "OPEN",
                    "carol@example.com",
                    LocalDateTime.now().minusDays(4)
            ));
        };
    }
}
