package com.example.DoctorServer.controller;

import com.example.DoctorServer.model.Appointments;
import com.example.DoctorServer.model.Doctors;
import com.example.DoctorServer.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DoctorpageController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/Doctorpage/ShowCurrentDoctorAppointments")
    public List<Appointments> showcurrentdoctorappointments(@RequestBody Doctors doc){
        return appointmentService.showCurrentAppointments(doc);
    }

    @PostMapping("/Doctorpage/ShowPreviousDoctorAppointments")
    public List<Appointments> showpreviousdoctorappointments(@RequestBody Doctors doc){
        return appointmentService.showPreviousAppointments(doc);
    }

    @PostMapping("/Doctorpage/FinishAppointment")
    public void finishAppointment(@RequestBody Appointments apreq){
        //System.out.println(apreq.getAid()); // im getting null value
       appointmentService.finishAppointment(apreq.getAid());
       System.out.println("Appointment marked Finished");
    }



}
