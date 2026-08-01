package com.example.assettracker.service;

import com.example.assettracker.dto.AuthResponse;
import com.example.assettracker.dto.LoginRequest;
import com.example.assettracker.dto.RegisterRequest;
import com.example.assettracker.exception.DuplicateResourceException;
import com.example.assettracker.model.AppUser;
import com.example.assettracker.repository.AppUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(
            AppUserRepository appUserRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        String email = normalizeEmail(request.getEmail());

        if (appUserRepository.existsByEmailIgnoreCase(email)) {
            throw new DuplicateResourceException("Email already exists: " + email);
        }

        AppUser user = new AppUser(
                request.getName().trim(),
                email,
                passwordEncoder.encode(request.getPassword()),
                "USER"
        );

        AppUser savedUser = appUserRepository.save(user);
        logger.info("Registered new user email={} role={}", savedUser.getEmail(), savedUser.getRole());

        return buildAuthResponse(savedUser);
    }

    public AuthResponse login(LoginRequest request) {
        String email = normalizeEmail(request.getEmail());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, request.getPassword())
        );

        AppUser user = appUserRepository.findByEmailIgnoreCase(email)
                .orElseThrow();

        logger.info("User logged in email={} role={}", user.getEmail(), user.getRole());

        return buildAuthResponse(user);
    }

    private AuthResponse buildAuthResponse(AppUser user) {
        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                "Bearer",
                jwtService.getExpirationMinutes(),
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }
}
