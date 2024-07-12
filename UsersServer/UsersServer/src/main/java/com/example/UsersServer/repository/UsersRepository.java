package com.example.UsersServer.repository;


import com.example.UsersServer.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users,Integer> {

    // for security
    Optional<Users> findByUname(String uname);

    @Query("SELECT u.uemail FROM Users u WHERE u.uid = :uid")
    String findUemailByUid(Integer uid);

}
