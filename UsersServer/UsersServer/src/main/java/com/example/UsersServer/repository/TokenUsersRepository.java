package com.example.UsersServer.repository;

import com.example.UsersServer.model.Utoken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenUsersRepository  extends JpaRepository<Utoken,Integer> {

    @Query("""
           select t from Utoken t inner join Users u on t.user.uid = u.uid
           where t.user.uid = :uid and t.logged_out = false 
    """)
    List<Utoken> findAllTokensByUser(Integer uid);

    Optional<Utoken> findByToken(String token);

}


