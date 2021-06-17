package com.rmaciel.itam.itam.authentications;

import java.util.Optional;

import com.rmaciel.itam.itam.accounts.Account;
import com.rmaciel.itam.itam.accounts.AccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    private AccountRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Account> account = repository.findByEmail(email);
        if (account.isPresent()) return account.get();

        throw new UsernameNotFoundException("Account e-mail not found");
    }
    
}
