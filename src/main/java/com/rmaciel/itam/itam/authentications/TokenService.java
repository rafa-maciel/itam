package com.rmaciel.itam.itam.authentications;

import java.sql.Timestamp;
import java.util.Date;

import com.rmaciel.itam.itam.accounts.Account;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenService {
    private static final String type = "Bearer";

    @Value("${itam.jwt.expiration}")
    private String expirationTime;

    @Value("${itam.jwt.secret}")
    private String jwtSecret;

    public TokenDTO build(Authentication auth) {
        Account account = (Account) auth.getPrincipal();
        Date timenow = new Date();
        Date expiration = new Date(timenow.getTime() + Long.parseLong(this.expirationTime));

        String token = Jwts.builder()
            .setIssuer("ITAM - Ivent System")
            .setSubject(account.getId().toString())
            .setIssuedAt(timenow)
            .setExpiration(expiration)
            .signWith(SignatureAlgorithm.HS256, this.jwtSecret)
            .compact();
        
        return new TokenDTO(token, type, new Timestamp(expiration.getTime()).toLocalDateTime());
    }

    public boolean isValid(String token) {
        return this.getTokenClaims(token) != null;
    }

    public Long getAccountId(String token) {
        Claims tokenClaims = getTokenClaims(token);
        return Long.parseLong(tokenClaims.getSubject());
    }

    private Claims getTokenClaims(String token) {
        try {
            return Jwts.parser().setSigningKey(this.jwtSecret).parseClaimsJws(token).getBody();
        } catch (Exception e) {
            return null;
        }
    }


    
}
