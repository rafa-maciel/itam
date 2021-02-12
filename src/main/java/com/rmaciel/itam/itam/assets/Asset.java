package com.rmaciel.itam.itam.assets;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.rmaciel.itam.itam.Locations.Location;
import com.rmaciel.itam.itam.Users.User;
import com.rmaciel.itam.itam.deviceModels.DeviceModel;

@Entity
public class Asset {
    private @Id @GeneratedValue Long id;
    private String name;
    private String type;

    @ManyToOne
    private DeviceModel model;
    private String tag;
    private String serialNumber;
    private Integer imei;
    private Integer code;

    @ManyToOne
    private User owner;

    @ManyToOne
    private Location location;
    private String leasing;

    @Enumerated(EnumType.STRING)
    private AssetStatus status;

    private Boolean onDomain;
    private String notes;


    public Asset() {}
    

    public Asset(String name, String type, DeviceModel model, String tag, 
        String serialNumber, Integer imei, Integer code, User owner, 
        Location location, String leasing, AssetStatus status, Boolean onDomain, 
        String notes) {
        this.name = name;
        this.type = type;
        this.model = model;
        this.tag = tag;
        this.serialNumber = serialNumber;
        this.imei = imei;
        this.code = code;
        this.owner = owner;
        this.location = location;
        this.leasing = leasing;
        this.status = status;
        this.onDomain = onDomain;
        this.notes = notes;
    }


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public DeviceModel getModel() {
        return this.model;
    }

    public void setModel(DeviceModel model) {
        this.model = model;
    }

    public String getTag() {
        return this.tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getSerialNumber() {
        return this.serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Integer getImei() {
        return this.imei;
    }

    public void setImei(Integer imei) {
        this.imei = imei;
    }

    public Integer getCode() {
        return this.code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public User getOwner() {
        return this.owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Location getLocation() {
        return this.location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getLeasing() {
        return this.leasing;
    }

    public void setLeasing(String leasing) {
        this.leasing = leasing;
    }

    public AssetStatus getStatus() {
        return this.status;
    }

    public void setStatus(AssetStatus status) {
        this.status = status;
    }

    public Boolean isOnDomain() {
        return this.onDomain;
    }

    public Boolean getOnDomain() {
        return this.onDomain;
    }

    public void setOnDomain(Boolean onDomain) {
        this.onDomain = onDomain;
    }

    public String getNotes() {
        return this.notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Asset)) {
            return false;
        }
        Asset asset = (Asset) o;
        return Objects.equals(id, asset.id) && Objects.equals(name, asset.name) && Objects.equals(type, asset.type) && Objects.equals(model, asset.model) && Objects.equals(tag, asset.tag) && Objects.equals(serialNumber, asset.serialNumber) && Objects.equals(imei, asset.imei) && Objects.equals(code, asset.code) && Objects.equals(owner, asset.owner) && Objects.equals(location, asset.location) && Objects.equals(leasing, asset.leasing) && Objects.equals(status, asset.status) && Objects.equals(onDomain, asset.onDomain) && Objects.equals(notes, asset.notes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, type, model, tag, serialNumber, imei, code, owner, location, leasing, status, onDomain, notes);
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", model='" + getModel() + "'" +
            ", tag='" + getTag() + "'" +
            ", serialNumber='" + getSerialNumber() + "'" +
            ", imei='" + getImei() + "'" +
            ", code='" + getCode() + "'" +
            ", owner='" + getOwner() + "'" +
            ", location='" + getLocation() + "'" +
            ", leasing='" + getLeasing() + "'" +
            ", status='" + getStatus() + "'" +
            ", onDomain='" + isOnDomain() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }    
}
