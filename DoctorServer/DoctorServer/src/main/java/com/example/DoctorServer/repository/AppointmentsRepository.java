package com.example.DoctorServer.repository;

import com.example.DoctorServer.model.Appointments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface AppointmentsRepository extends JpaRepository<Appointments,Integer> {
    List<Appointments> findByAdid(Integer adid);

    @Modifying
    @Transactional
    @Query("UPDATE Appointments a SET a.astatus = true WHERE a.aid = :aid")
    void updateAstatustotrue( Integer aid);

    @Query("SELECT a FROM Appointments a WHERE a.adid = :adid AND a.astatus = true")
    List<Appointments> findByAuidAndAstatusIsTrue( Integer adid);

    @Query("SELECT a FROM Appointments a WHERE a.adid = :adid AND a.astatus = false")
    List<Appointments> findByAuidAndAstatusIsFalse( Integer adid);

}
