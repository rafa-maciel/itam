package com.rmaciel.itam.itam.authentications;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class AuthenticationForm {
    private String email;
    private String password;

    public AuthenticationForm(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public UsernamePasswordAuthenticationToken toToken() {
        return new UsernamePasswordAuthenticationToken(this.email, this.password);
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }


    
}
