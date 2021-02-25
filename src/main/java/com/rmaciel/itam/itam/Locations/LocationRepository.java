package com.rmaciel.itam.itam.Locations;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;

public interface LocationRepository extends CrudRepository<Location, Long>{
    
    @RestResource(path = "locationContains", rel = "locationContains")
    Page<Location> findByTitleContainsOrCityContains(String title, String city, Pageable p);
}
