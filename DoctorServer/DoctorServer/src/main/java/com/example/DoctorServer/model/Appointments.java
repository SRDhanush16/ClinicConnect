package com.example.DoctorServer.model;

import jakarta.persistence.*;

@Entity
@Table(name="Appointments")
public class Appointments {
    public Appointments(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="aid")
    private Integer aid;

    @Column(name="auid")
    private Integer auid;

    @Column(name="auname")
    private String auname;

    @Column(name="pname")
    private String pname;

    @Column(name="page")
    private String page;

    @Column(name="pphone")
    private String pphone;

    @Column(name="adid")
    private Integer adid;

    @Column(name="adname")
    private String adname;

    @Column(name="adate")
    private String adate;

    @Column(name="aslot")
    private String aslot;

    @Column(name="astatus")
    private boolean astatus;

    @Column(name="drating")
    private Integer drating;

    // getters and setters


    public Integer getAid() {
        return aid;
    }

    public void setAid(Integer aid) {
        this.aid = aid;
    }

    public Integer getAuid() {
        return auid;
    }

    public void setAuid(Integer auid) {
        this.auid = auid;
    }

    public String getAuname() {
        return auname;
    }

    public void setAuname(String auname) {
        this.auname = auname;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public String getPage() {
        return page;
    }

    public void setPage(String page) {
        this.page = page;
    }

    public String getPphone() {
        return pphone;
    }

    public void setPphone(String pphone) {
        this.pphone = pphone;
    }

    public Integer getAdid() {
        return adid;
    }

    public void setAdid(Integer adid) {
        this.adid = adid;
    }

    public String getAdname() {
        return adname;
    }

    public void setAdname(String adname) {
        this.adname = adname;
    }

    public String getAdate() {
        return adate;
    }

    public void setAdate(String adate) {
        this.adate = adate;
    }

    public String getAslot() {
        return aslot;
    }

    public void setAslot(String aslot) {
        this.aslot = aslot;
    }

    public boolean isAstatus() {
        return astatus;
    }

    public void setAstatus(boolean astatus) {
        this.astatus = astatus;
    }

    public Integer getDrating() {
        return drating;
    }

    public void setDrating(Integer drating) {
        this.drating = drating;
    }
}
