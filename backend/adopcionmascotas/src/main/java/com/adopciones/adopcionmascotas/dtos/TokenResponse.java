package com.adopciones.adopcionmascotas.dtos;

public class TokenResponse {
    private String accessToken;

    public TokenResponse() {}

    public TokenResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}