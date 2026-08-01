package com.example.assettracker.dto;

public class AuthResponse {

    private String token;
    private String tokenType;
    private long expiresInMinutes;
    private String userId;
    private String name;
    private String email;
    private String role;

    public AuthResponse(String token, String tokenType, long expiresInMinutes,
                        String userId, String name, String email, String role) {
        this.token = token;
        this.tokenType = tokenType;
        this.expiresInMinutes = expiresInMinutes;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public String getToken() { return token; }
    public String getTokenType() { return tokenType; }
    public long getExpiresInMinutes() { return expiresInMinutes; }
    public String getUserId() { return userId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
}
