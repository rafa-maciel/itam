package com.rmaciel.itam.itam.config.security;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.rmaciel.itam.itam.accounts.Account;
import com.rmaciel.itam.itam.accounts.AccountRepository;
import com.rmaciel.itam.itam.authentications.TokenService;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class TokenAuthenticationFilter extends OncePerRequestFilter {

    private TokenService tokenService;
    private AccountRepository repository;

    public TokenAuthenticationFilter(TokenService tokenService, AccountRepository repository) {
        this.tokenService = tokenService;
        this.repository = repository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String token = this.getTokenFrom(request);
        if (this.tokenService.isValid(token))
                this.authenticate(token);

        filterChain.doFilter(request, response);
    }

    private String getTokenFrom(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token == null || token.isEmpty() || !token.startsWith("Bearer"))
            return null;

        return token.substring(7, token.length());
    }

    private void authenticate(String token) {
        Long accountId = this.tokenService.getAccountId(token);
        Optional<Account> optional = this.repository.findById(accountId);
        if (optional.isPresent()) {
            Account account = optional.get();
            UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(account, null, account.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }
    
}
