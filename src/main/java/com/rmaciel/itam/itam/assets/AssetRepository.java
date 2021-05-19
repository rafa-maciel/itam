package com.rmaciel.itam.itam.assets;

import java.util.List;

import com.rmaciel.itam.itam.Users.User;
import com.rmaciel.itam.itam.assets.projections.AssetProjection;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(excerptProjection = AssetProjection.class)
public interface AssetRepository extends PagingAndSortingRepository<Asset, Long> {
    
    @RestResource(path = "allFromOwner", rel = "allFromOwner")
    List<Asset> findByOwnerId(Long ownerId);
}
