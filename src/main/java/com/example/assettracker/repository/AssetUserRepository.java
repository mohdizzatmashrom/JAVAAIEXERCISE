package com.example.assettracker.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.assettracker.model.AppUser;

public interface AssetUserRepository extends MongoRepository<AppUser, String> {
    Optional<AppUser> findByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCase(String email);
}
