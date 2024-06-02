package com.example.DoctorServer.repository;

import com.example.DoctorServer.model.Dtoken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenDoctorsRepository extends JpaRepository<Dtoken,Integer> {
    @Query("""
           select t from Dtoken t inner join Doctors d on t.doctor.did = d.did
           where t.doctor.did = :did and t.logged_out = false 
    """)
    List<Dtoken> findAllTokensByDoctor(Integer did);

    Optional<Dtoken> findByToken(String token);
}
