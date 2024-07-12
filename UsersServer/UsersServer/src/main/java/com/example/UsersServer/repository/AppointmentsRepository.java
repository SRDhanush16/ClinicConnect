package com.example.UsersServer.repository;

import com.example.UsersServer.model.Appointments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentsRepository extends JpaRepository<Appointments,Integer> {

    List<Appointments> findByAuid(Integer auid);
    void deleteByAid(Integer aid);

    @Query("SELECT a FROM Appointments a WHERE a.auid = :auid AND a.astatus = true")
    List<Appointments> findByAuidWhereAstatusIsTrue( Integer auid);

    @Query("SELECT a FROM Appointments a WHERE a.auid = :auid AND a.astatus = false")
    List<Appointments> findByAuidWhereAstatusIsFalse(Integer auid);


}
