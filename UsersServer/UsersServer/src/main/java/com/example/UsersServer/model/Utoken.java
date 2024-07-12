package com.example.UsersServer.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Utoken")
public class Utoken {

    public Utoken(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tuid")
    private Integer tuid;
    @Column(name = "is_logged_out")
    private boolean logged_out;
    @ManyToOne
    @JoinColumn(name="usersid")
    private Users user;
    @Column(name = "token")
    private String token;

    public Integer getTuid() {
        return tuid;
    }

    public void setTuid(Integer tuid) {
        this.tuid = tuid;
    }

    public boolean isLogged_out() {
        return logged_out;
    }

    public void setLogged_out(boolean logged_out) {
        this.logged_out = logged_out;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}
