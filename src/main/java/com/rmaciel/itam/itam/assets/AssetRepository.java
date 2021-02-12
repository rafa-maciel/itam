package com.rmaciel.itam.itam.assets;

import com.rmaciel.itam.itam.assets.projections.AssetProjection;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = AssetProjection.class)
public interface AssetRepository extends PagingAndSortingRepository<Asset, Long> {
    
}
