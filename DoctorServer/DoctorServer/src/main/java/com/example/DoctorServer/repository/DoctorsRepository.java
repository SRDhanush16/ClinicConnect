package com.example.DoctorServer.repository;

import com.example.DoctorServer.model.DoctorDetails;
import com.example.DoctorServer.model.Doctors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorsRepository extends JpaRepository<Doctors,Integer> {




    // for security
    Optional<Doctors> findByDname(String dname);

    @Modifying
    @Transactional
    @Query("UPDATE Doctors d SET d.rating = :rating WHERE d.did = :did")
    void updateRatingByDid( Integer did,  Integer rating);


    @Query("SELECT new com.example.DoctorServer.model.DoctorDetails(d.did, d.dname, d.specialization, d.slot1, d.slot2) FROM Doctors d")
    List<DoctorDetails> findAllDoctorDetails();

}
