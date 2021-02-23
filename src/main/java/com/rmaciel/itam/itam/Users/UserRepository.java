package com.rmaciel.itam.itam.Users;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.data.web.PageableDefault;

public interface UserRepository extends CrudRepository<User, Long>{

    @RestResource(path = "nameContains", rel = "nameContains")
    Page<User> findByNameContains(String name, @PageableDefault(size = 5) Pageable p);
    
}
