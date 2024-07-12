package com.example.UsersServer.repository;

import com.example.UsersServer.model.Schedules;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface SchedulesRepository extends JpaRepository<Schedules,Integer> {

    @Query("SELECT s.numofpatients FROM Schedules s WHERE s.sdname = :dname AND s.date = :date AND s.slot = :slot")
    Integer findNumofPatientsByDnameDateSlot( String dname,  String date,  String slot);

    @Modifying
    @Transactional
    @Query("UPDATE Schedules s SET s.numofpatients = s.numofpatients + 1 WHERE s.sdname = :dname AND s.date = :date AND s.slot = :slot")
    void incrementNumofPatientsByOne( String dname,  String date,  String slot);

    @Modifying
    @Transactional
    @Query("UPDATE Schedules s SET s.numofpatients = s.numofpatients - 1 WHERE s.sdname = :dname AND s.date = :date AND s.slot = :slot")
    void decrementNumofPatientsByOne( String dname,  String date,  String slot);

    @Query("SELECT COUNT(s) > 0 FROM Schedules s WHERE s.sdname = :dname AND s.date = :date AND s.slot = :slot")
    boolean isSchedulePresent( String dname,  String date,  String slot);

}
