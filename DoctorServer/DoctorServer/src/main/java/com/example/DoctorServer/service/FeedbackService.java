package com.example.DoctorServer.service;

import com.example.DoctorServer.model.Appointments;
import com.example.DoctorServer.repository.AppointmentsRepository;
import com.example.DoctorServer.repository.DoctorsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {

    @Autowired
    private DoctorsRepository doctorsRepository;

    public void updatedoctorfeedback(Appointments apreq){
        doctorsRepository.updateRatingByDid(apreq.getAdid(),apreq.getDrating());
        System.out.println("Updated Doctors Rating");
    }



}
