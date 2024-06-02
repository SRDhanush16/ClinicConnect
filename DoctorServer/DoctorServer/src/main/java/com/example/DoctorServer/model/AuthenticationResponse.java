package com.example.DoctorServer.model;

public class AuthenticationResponse {
    private String token;
    private boolean message;
    public AuthenticationResponse(String token, boolean message) {
        this.token = token;
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public boolean getMessage() {
        return message;
    }
}
