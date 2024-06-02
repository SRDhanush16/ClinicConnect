package com.example.DoctorServer.service;


import com.example.DoctorServer.model.AuthenticationResponse;
import com.example.DoctorServer.model.Doctors;
import com.example.DoctorServer.model.Dtoken;
import com.example.DoctorServer.repository.DoctorsRepository;
import com.example.DoctorServer.repository.TokenDoctorsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class AuthenticationService {


    @Autowired
    private DoctorsRepository doctorsRepository;

    @Autowired
    private TokenDoctorsRepository tokenDoctorsRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean createdoctor(Doctors DoctorRegistrationRequest){

        if(doctorsRepository.findByDname(DoctorRegistrationRequest.getDname()).isPresent()){
            System.out.println("Doctor Already Exist");
            return false;
        }

        DoctorRegistrationRequest.setDpassword(passwordEncoder.encode(DoctorRegistrationRequest.getDpassword()));
        doctorsRepository.save(DoctorRegistrationRequest);
        System.out.println("Doctor created Successfully");
        return true;
    }
    public AuthenticationResponse authenticatedoctor(Doctors loginrequest){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginrequest.getUsername(),loginrequest.getPassword()
                )
        );
        Doctors doctor =  doctorsRepository.findByDname(loginrequest.getUsername()).orElseThrow();
        String jwt = jwtService.generateTokenforDoctor(doctor);
        revokeAllTokenByDoctor(doctor);
        saveDoctorToken(jwt,doctor);
        return new AuthenticationResponse(jwt,true);
    }


    private void revokeAllTokenByDoctor(Doctors doctor){
        List<Dtoken> validTokens = tokenDoctorsRepository.findAllTokensByDoctor(doctor.getDid());
        if(validTokens.isEmpty()){return ;}
        validTokens.forEach(t->{
            t.setLogged_out(true);
        });
        tokenDoctorsRepository.saveAll(validTokens);
    }

    private void saveDoctorToken(String jwt,Doctors doctor){
        Dtoken token = new Dtoken();
        token.setToken(jwt);
        token.setLogged_out(false);
        token.setDoctor(doctor);
        tokenDoctorsRepository.save(token);
    }

    public void logoutdoctor(String token){
        Dtoken storedToken = tokenDoctorsRepository.findByToken(token).orElse(null);
        if(storedToken != null){
            storedToken.setLogged_out(true);
            tokenDoctorsRepository.save(storedToken);
        }
    }



}
