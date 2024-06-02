package com.example.DoctorServer.model;


import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "Doctors")
public class Doctors implements UserDetails {


    public Doctors(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="did")
    private Integer did;
    @Column(name="dname")
    private String dname;

    @Column(name="dpassword")
    private String dpassword;

    @Column(name="demail")
    private String demail;

    @Column(name="specialization")
    private String specialization;

    @Column(name="shift")
    private String shift;

    @Column(name="slot1")
    private String slot1;

    @Column(name="slot2")
    private String slot2;

    @Column(name="rating")
    private Integer rating;

    @Column(name="rolee")
    @Enumerated(EnumType.STRING)
    private Role rolee;

    @OneToMany(mappedBy = "doctor")
    private List<Dtoken> tokens;

    //implementing UserDetails methods
    public String getUsername() {
        return dname;
    }
    public String getPassword(){
        return dpassword;
    }

    // getters and setters

    public Integer getDid() {
        return did;
    }

    public void setDid(Integer did) {
        this.did = did;
    }

    public String getDname() {
        return dname;
    }

    public void setDname(String dname) {
        this.dname = dname;
    }

    public String getDpassword() {
        return dpassword;
    }

    public void setDpassword(String dpassword) {
        this.dpassword = dpassword;
    }

    public String getDemail() {
        return demail;
    }

    public void setDemail(String demail) {
        this.demail = demail;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getShift() {
        return shift;
    }

    public void setShift(String shift) {
        this.shift = shift;
    }

    public String getSlot1() {
        return slot1;
    }

    public void setSlot1(String slot1) {
        this.slot1 = slot1;
    }

    public String getSlot2() {
        return slot2;
    }

    public void setSlot2(String slot2) {
        this.slot2 = slot2;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Role getRolee() {
        return rolee;
    }

    public void setRolee(Role rolee) {
        this.rolee = rolee;
    }

    public List<Dtoken> getTokens() {
        return tokens;
    }

    public void setTokens(List<Dtoken> tokens) {
        this.tokens = tokens;
    }

    // Some extra security methods
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(rolee.name()));
    }

}
