package com.rmaciel.itam.itam.accounts;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
public class Account implements UserDetails {
    @Id @GeneratedValue private Long id;
    private String email;
    private String password;
    private Boolean enabled = Boolean.TRUE;

    @ElementCollection(targetClass = AccountRole.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private List<AccountRole> roles;

    public Account() {
    }

    public Account(String email, String password, Boolean enabled, List<AccountRole> roles) {
        this.email = email;
        this.password = new BCryptPasswordEncoder().encode(password);
        this.enabled = enabled;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.enabled;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.enabled;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.enabled;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", email='" + this.email + "'" +
            ", enabled='" + isEnabled() + "'" +
            "}";
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Account)) {
            return false;
        }
        Account account = (Account) o;
        return Objects.equals(id, account.id) && Objects.equals(email, account.email) && Objects.equals(password, account.password) && Objects.equals(enabled, account.enabled) && Objects.equals(roles, account.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, password, enabled, roles);
    }
    

}