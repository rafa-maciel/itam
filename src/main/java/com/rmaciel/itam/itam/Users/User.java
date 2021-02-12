package com.rmaciel.itam.itam.Users;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {
    private @Id @GeneratedValue Long id;
    private String re;
    private String name;
    private String department;
    private String jobRole;


    public User() {
    }


    public User(String re, String name, String department, String jobRole) {
        this.re = re;
        this.name = name;
        this.department = department;
        this.jobRole = jobRole;
    }


    public Long getId() {
        return this.id;
    }

    public String getRe() {
        return this.re;
    }

    public void setRe(String re) {
        this.re = re;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getJobRole() {
        return this.jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", re='" + getRe() + "'" +
            ", name='" + getName() + "'" +
            ", department='" + getDepartment() + "'" +
            ", jobRole='" + getJobRole() + "'" +
            "}";
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof User)) {
            return false;
        }
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(re, user.re) && Objects.equals(name, user.name) && Objects.equals(department, user.department) && Objects.equals(jobRole, user.jobRole);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, re, name, department, jobRole);
    }


    
}
