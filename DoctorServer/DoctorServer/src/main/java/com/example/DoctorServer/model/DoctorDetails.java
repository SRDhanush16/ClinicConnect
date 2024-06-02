package com.example.DoctorServer.model;

public class DoctorDetails {
    private Integer did;
    private String dname;
    private String specialization;
    private String slot1;
    private String slot2;

    public DoctorDetails(Integer did, String dname, String specialization, String slot1, String slot2) {
        this.did = did;
        this.dname = dname;
        this.specialization = specialization;
        this.slot1 = slot1;
        this.slot2 = slot2;
    }

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

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
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
}
