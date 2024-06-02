package com.example.DoctorServer.controller;

import com.example.DoctorServer.model.AuthenticationResponse;
import com.example.DoctorServer.model.DoctorDetails;
import com.example.DoctorServer.model.Doctors;
import com.example.DoctorServer.model.response.LoginResponse;
import com.example.DoctorServer.repository.DoctorsRepository;
import com.example.DoctorServer.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class MainpageController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private DoctorsRepository doctorsRepository;

    @PostMapping("/Doctorslogin")
    public LoginResponse logindoctor(@RequestBody Doctors loginreq){
        AuthenticationResponse ar = authenticationService.authenticatedoctor(loginreq);
        System.out.println("Login Successful");

        LoginResponse lgres = new LoginResponse();
        Optional<Doctors> doc = doctorsRepository.findByDname(loginreq.getDname());
        if(doc.isPresent()){
            Doctors doctor = doc.get();
            lgres.setDid(doctor.getDid());
            lgres.setDname(doctor.getDname());
            lgres.setDemail(doctor.getDemail());
            lgres.setRating(doctor.getRating());
            lgres.setToken(ar.getToken());
            lgres.setIslogged(ar.getMessage());

        }else{
            throw new UsernameNotFoundException("Doctor Not Found");
        }
        return lgres;
    }

    @PostMapping("/Createdoctor")
    public boolean createdoctor(@RequestBody Doctors loginreq){
        boolean ar = authenticationService.createdoctor(loginreq);
        System.out.println("Doctor Created Successful");
        return ar ;
    }

    @PostMapping("/logoutdoctor")
    public String logoutdoctor(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            authenticationService.logoutdoctor(token);
            return " Doctor Logout Success";
        } else {
            return "Authorization header missing or invalid";
        }
    }

    @GetMapping("/getDoctorList")
    public List<DoctorDetails> getDoctors(){
        return doctorsRepository.findAllDoctorDetails();
    }


}
