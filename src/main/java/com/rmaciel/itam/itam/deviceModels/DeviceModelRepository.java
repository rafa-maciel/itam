package com.rmaciel.itam.itam.deviceModels;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;

public interface DeviceModelRepository extends CrudRepository<DeviceModel, Long>{

    @RestResource(path = "modelContains", rel = "modelContains")
    Page<DeviceModel> findByModelContains(String model, Pageable p);
    
}
