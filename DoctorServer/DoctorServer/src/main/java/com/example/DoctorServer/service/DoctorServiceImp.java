package com.example.DoctorServer.service;

import com.example.DoctorServer.repository.DoctorsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class DoctorServiceImp implements UserDetailsService {
    @Autowired
    private DoctorsRepository doctorsRepository;
    public UserDetails loadUserByUsername(String dname) throws UsernameNotFoundException {
        return doctorsRepository.findByDname(dname)
                .orElseThrow(()-> new UsernameNotFoundException("Doctor not found"));
    }

}

