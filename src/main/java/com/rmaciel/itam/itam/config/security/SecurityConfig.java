package com.rmaciel.itam.itam.config.security;

import com.rmaciel.itam.itam.accounts.AccountRepository;
import com.rmaciel.itam.itam.authentications.AuthenticationService;
import com.rmaciel.itam.itam.authentications.TokenService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthenticationService authService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AccountRepository repository;

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().authorizeRequests()
            .antMatchers(HttpMethod.POST, "/auth").permitAll()
            .antMatchers("/").permitAll()
            .antMatchers("/app/**").permitAll()
            .antMatchers("/built/**").permitAll()
            .anyRequest().authenticated()
            .and().csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and().addFilterBefore(
                new TokenAuthenticationFilter(this.tokenService, repository), 
                UsernamePasswordAuthenticationFilter.class);
    }





}