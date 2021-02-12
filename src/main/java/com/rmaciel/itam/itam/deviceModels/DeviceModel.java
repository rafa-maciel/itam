package com.rmaciel.itam.itam.deviceModels;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class DeviceModel {
    private @Id @GeneratedValue Long id;
    private String model;
    private String brand;


    public DeviceModel() {
    }


    public DeviceModel(String model, String brand) {
        this.model = model;
        this.brand = brand;
    }


    public String getModel() {
        return model;
    }
    public void setModel(String model) {
        this.model = model;
    }
    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    @Override
    public String toString() {
        return this.brand + " - " + this.model;
    }
    

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof DeviceModel)) {
            return false;
        }
        DeviceModel deviceModel = (DeviceModel) o;
        return Objects.equals(id, deviceModel.id) && Objects.equals(model, deviceModel.model) && Objects.equals(brand, deviceModel.brand);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, model, brand);
    }

}
