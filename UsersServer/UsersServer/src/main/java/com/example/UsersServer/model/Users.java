package com.example.UsersServer.model;


import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "Users")
public class Users implements UserDetails {
    public Users(){}
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid")
    private Integer uid;
    @Column(name = "uname")
    private String uname;
    @Column(name = "upassword")
    private String upassword;
    @Column(name = "uemail")
    private String uemail;
    @Column(name = "uphone")
    private String uphone;

    @Column(name="rolee")
    @Enumerated(EnumType.STRING)
    private Role rolee;

    @OneToMany(mappedBy = "user")
    private List<Utoken> tokens;

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getUpassword() {
        return upassword;
    }

    public void setUpassword(String upassword) {
        this.upassword = upassword;
    }

    public String getUemail() {
        return uemail;
    }

    public void setUemail(String uemail) {
        this.uemail = uemail;
    }

    public String getUphone() {
        return uphone;
    }

    public void setUphone(String uphone) {
        this.uphone = uphone;
    }

    public Role getRolee() {
        return rolee;
    }

    public void setRolee(Role rolee) {
        this.rolee = rolee;
    }

    public List<Utoken> getTokens() {
        return tokens;
    }

    public void setTokens(List<Utoken> tokens) {
        this.tokens = tokens;
    }

    // implementing UserDetails
    public String getUsername(){return uname;}
    public String getPassword(){return upassword;}


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
