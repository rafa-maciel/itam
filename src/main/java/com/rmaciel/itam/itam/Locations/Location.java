package com.rmaciel.itam.itam.Locations;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Location {
    private @Id @GeneratedValue Long id;
    private String title;
    private String city;
    private String address;


    public Location() {
    }


    public Location(String title, String city, String address) {
        this.title = title;
        this.city = city;
        this.address = address;
    }


    public Long getId() {
        return this.id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Location)) {
            return false;
        }
        Location location = (Location) o;
        return Objects.equals(id, location.id) && Objects.equals(title, location.title) && Objects.equals(city, location.city) && Objects.equals(address, location.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, city, address);
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", title='" + getTitle() + "'" +
            ", city='" + getCity() + "'" +
            ", address='" + getAddress() + "'" +
            "}";
    }    
}
