package com.example.DoctorServer.model;

import jakarta.persistence.*;

@Entity
@Table(name="Dtoken")
public class Dtoken {

    public Dtoken(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="tdid")
    private Integer tdid;

    @Column(name="is_logged_out")
    private boolean logged_out;

    @ManyToOne
    @JoinColumn(name="doctorsid")
    private Doctors doctor;

    @Column(name="token")
    private String token;

    public Integer getTdid() {
        return tdid;
    }

    public void setTdid(Integer tdid) {
        this.tdid = tdid;
    }

    public boolean isLogged_out() {
        return logged_out;
    }

    public void setLogged_out(boolean logged_out) {
        this.logged_out = logged_out;
    }

    public Doctors getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctors doctor) {
        this.doctor = doctor;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }


}
