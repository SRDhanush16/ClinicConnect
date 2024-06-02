package com.example.UsersServer.service;

import com.example.UsersServer.model.Appointments;
import com.example.UsersServer.model.Schedules;
import com.example.UsersServer.model.Users;
import com.example.UsersServer.repository.AppointmentsRepository;
import com.example.UsersServer.repository.SchedulesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentsService {

    @Autowired
    private SchedulesRepository schedulesRepository;

    @Autowired
    private AppointmentsRepository appointmentsRepository;

    @Autowired
    private EmailService emS;

    /*
    * First Checks if the Schedule is available
    * if yes, then add appointment request
    * else tell schedule is full please choose another date or slot
    * */
    public boolean bookAppointment(Appointments apreq) {
        boolean isSchedulePresent = schedulesRepository.isSchedulePresent(apreq.getAdname(), apreq.getAdate(), apreq.getAslot());
        Integer numofPatients = schedulesRepository.findNumofPatientsByDnameDateSlot(apreq.getAdname(), apreq.getAdate(), apreq.getAslot());

        if (!isSchedulePresent) {
            appointmentsRepository.save(apreq);
            Schedules sch = new Schedules();
            sch.setSdid(apreq.getAdid());
            sch.setSdname(apreq.getAdname());
            sch.setDate(apreq.getAdate());
            sch.setSlot(apreq.getAslot());
            sch.setNumofpatients(1);
            schedulesRepository.save(sch);
            emS.sendBookingConfirmation(apreq);
            return true;
        } else if (isSchedulePresent && (numofPatients == null || numofPatients < 6)) {
            appointmentsRepository.save(apreq);
            schedulesRepository.incrementNumofPatientsByOne(apreq.getAdname(), apreq.getAdate(), apreq.getAslot());
            emS.sendBookingConfirmation(apreq);
            return true;
        } else {
            return false;
        }
    }

    public List<Appointments> showCurrentUserAppointments(Users user){
        return appointmentsRepository.findByAuidWhereAstatusIsFalse(user.getUid());
    }
    public List<Appointments> showPreviousUserAppointments(Users user){
        return appointmentsRepository.findByAuidWhereAstatusIsTrue(user.getUid());
    }

    public boolean cancelAppointment(Appointments apreq){
        Appointments appointment = appointmentsRepository.findById(apreq.getAid()).orElse(null);
        if (appointment != null) {
            appointmentsRepository.delete(appointment);
            schedulesRepository.decrementNumofPatientsByOne(appointment.getAdname(), appointment.getAdate(), appointment.getAslot());
            emS.sendBookingCancellationConfirmation(apreq);
            return true;
        }
        return false; // Return false if appointment with given aid is not found
    }



}
