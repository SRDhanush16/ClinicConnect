package com.example.DoctorServer.model.response;

import com.example.DoctorServer.model.AuthenticationResponse;

public class LoginResponse {
    private Integer did;

    private String dname;

    private String demail;

    private Integer rating;

    private String token;

    private boolean islogged;


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

    public String getDemail() {
        return demail;
    }

    public void setDemail(String demail) {
        this.demail = demail;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isIslogged() {
        return islogged;
    }

    public void setIslogged(boolean islogged) {
        this.islogged = islogged;
    }
}
