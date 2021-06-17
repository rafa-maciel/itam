package com.rmaciel.itam.itam.accounts;

import org.springframework.security.core.GrantedAuthority;

public enum AccountRole implements GrantedAuthority {
    ADMIN, IT, RH;

    @Override
    public String getAuthority() {
        return this.toString();
    }
}
