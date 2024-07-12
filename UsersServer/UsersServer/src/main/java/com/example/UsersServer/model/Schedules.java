package com.example.UsersServer.model;

import jakarta.persistence.*;


@Entity
@Table(name = "Schedules")
public class Schedules {
    public Schedules(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="sid")
    private Integer sid;
    @Column(name="sdid")
    private Integer sdid;
    @Column(name="sdname")
    private String sdname;
    @Column(name="date")
    private String date;
    @Column(name="slot")
    private String slot;
    @Column(name="numofpatients")
    private int numofpatients;

    // getters and setters
    public Integer getSid() {
        return sid;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }

    public Integer getSdid() {
        return sdid;
    }

    public void setSdid(Integer sdid) {
        this.sdid = sdid;
    }

    public String getSdname() {
        return sdname;
    }

    public void setSdname(String sdname) {
        this.sdname = sdname;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getSlot() {
        return slot;
    }

    public void setSlot(String slot) {
        this.slot = slot;
    }

    public int getNumofpatients() {
        return numofpatients;
    }

    public void setNumofpatients(int numofpatients) {
        this.numofpatients = numofpatients;
    }

}
