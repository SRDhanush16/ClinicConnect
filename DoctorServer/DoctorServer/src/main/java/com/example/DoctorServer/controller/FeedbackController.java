package com.example.DoctorServer.controller;

import com.example.DoctorServer.model.Appointments;
import com.example.DoctorServer.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/Userpage/AppointmentFeedback")
    public void AppointmentFeedback(@RequestBody Appointments apreq){
        feedbackService.updatedoctorfeedback(apreq);
    }

}
