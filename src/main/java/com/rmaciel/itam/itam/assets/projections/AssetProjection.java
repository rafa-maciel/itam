package com.rmaciel.itam.itam.assets.projections;

import com.rmaciel.itam.itam.Locations.Location;
import com.rmaciel.itam.itam.Users.User;
import com.rmaciel.itam.itam.assets.Asset;
import com.rmaciel.itam.itam.deviceModels.DeviceModel;

import org.springframework.data.rest.core.config.Projection;


@Projection(name = "assetFull", types = {Asset.class})
public interface AssetProjection {
    String getName();
    String getType();

    DeviceModel getModel();
    String getSerialNumber();
    User getOwner();
    Location getLocation();
}
