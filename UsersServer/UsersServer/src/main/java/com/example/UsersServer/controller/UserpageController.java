package com.example.UsersServer.controller;

import com.example.UsersServer.model.Appointments;
import com.example.UsersServer.model.Users;
import com.example.UsersServer.service.AppointmentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserpageController {

    @Autowired
    private AppointmentsService appointmentsService;

    /*
    * Sends the appointment request to the appointmentservice;
    * */
    @PostMapping("/Userpage/BookAppointment")
    public boolean bookAppointment(@RequestBody Appointments apreq){
        return appointmentsService.bookAppointment(apreq);
    }

    /*
    * Will fetch all the appointments of the user , but should provide uid
    * */
    @PostMapping("/Userpage/ShowCurrentUserAppointments")
    public List<Appointments> showCurrentUserAppointments(@RequestBody Users user){
        return appointmentsService.showCurrentUserAppointments(user);
    }
    @PostMapping("/Userpage/ShowPreviousUserAppointments")
    public List<Appointments> showPreviousUserAppointments(@RequestBody Users user){
        return appointmentsService.showPreviousUserAppointments(user);
    }

    // for cancelling the appointment
    @PostMapping("/Userpage/CancelAppointment")
    public void cancelAppointment(@RequestBody Appointments apreq){
         appointmentsService.cancelAppointment(apreq);
    }

}
