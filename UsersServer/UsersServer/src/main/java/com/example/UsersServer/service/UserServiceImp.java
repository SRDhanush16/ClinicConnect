package com.example.UsersServer.service;

import com.example.UsersServer.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserDetailsService {
    @Autowired
    private UsersRepository usersRespository;

    public UserDetails loadUserByUsername(String uname) throws UsernameNotFoundException {
        return usersRespository.findByUname(uname)
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));
    }
}