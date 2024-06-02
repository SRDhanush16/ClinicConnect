package com.example.DoctorServer.service;

import com.example.DoctorServer.model.Appointments;
import com.example.DoctorServer.model.Doctors;
import com.example.DoctorServer.repository.AppointmentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentsRepository appointmentsRepository;

    public List<Appointments> showAppointments(Integer adid){

        return appointmentsRepository.findByAdid(adid);
    }

    public List<Appointments> showCurrentAppointments(Doctors doc){
        return appointmentsRepository.findByAuidAndAstatusIsFalse(doc.getDid());
    }

    public List<Appointments> showPreviousAppointments(Doctors doc){
        return appointmentsRepository.findByAuidAndAstatusIsTrue(doc.getDid());
    }

    public void finishAppointment(Integer aid){

        appointmentsRepository.updateAstatustotrue(aid);
    }

}
