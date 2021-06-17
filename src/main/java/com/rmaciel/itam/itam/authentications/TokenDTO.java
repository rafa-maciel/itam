package com.rmaciel.itam.itam.authentications;

import java.time.LocalDateTime;

public class TokenDTO {
    private String token;
    private String type;
    private LocalDateTime expiration;


    public TokenDTO(String token, String type, LocalDateTime expiration) {
        this.token = token;
        this.type = type;
        this.expiration = expiration;
    }

    public String getToken() {
        return this.token;
    }

    public String getType() {
        return this.type;
    }

    public LocalDateTime getExpiration() {
        return this.expiration;
    }

}
