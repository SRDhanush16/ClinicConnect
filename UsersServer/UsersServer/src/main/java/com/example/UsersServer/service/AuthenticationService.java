package com.example.UsersServer.service;

import com.example.UsersServer.model.AuthenticationResponse;
import com.example.UsersServer.model.Users;
import com.example.UsersServer.model.Utoken;
import com.example.UsersServer.repository.TokenUsersRepository;
import com.example.UsersServer.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthenticationService {


    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private TokenUsersRepository tokenUsersRepository;

    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emS;


    /*
    * passwordEncoder does BCrypt for us, check UserSecurityConfig
    * */
    public boolean createaccount(Users register){
        if(usersRepository.findByUname(register.getUname()).isPresent()){
            System.out.println("User Already Exist");
            return  false;
        }
        register.setUpassword(passwordEncoder.encode(register.getUpassword()));
        usersRepository.save(register);
        System.out.println("User created Successfully");
        emS.CreateAccountConfirmation(register);
        return  true;

    }

    /*
    * Find the username and passsword from DB, this id done by the authencation manager.
    * authenticationManager it authenticates the user, like How? again abstraction.
    * you are creating an object of UsernamePasswordAuthenticationToken(setting it username and password)
    *
    * if username and password are fine, correct, then the token will be created for the given username
    *
    * now we revoke all the existing valid/timeout tokens. by this way we made sure that we solve the parallel/concurrent logins.
    * and we save the newly created token
    * */
    public AuthenticationResponse authenticateuser(Users loginrequest){
        // dont know whiy i used it here
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginrequest.getUsername(),loginrequest.getPassword()
                )
        );
        // we dont know the users role, so we go fetch all the data from the given user and
        // we pass it to the jwtService it will use the user role from it
        Users user =  usersRepository.findByUname(loginrequest.getUsername()).orElseThrow(); // used for fetching the user role
        String jwt = jwtService.generateTokenforUser(user);
        revokeAllTokenByUser(user);
        saveUserToken(jwt,user);
        return new AuthenticationResponse(jwt,true);
    }

    private void revokeAllTokenByUser(Users user){
        List<Utoken> validTokens = tokenUsersRepository.findAllTokensByUser(user.getUid());
        if(validTokens.isEmpty()){return ;}
        validTokens.forEach(t->{
            t.setLogged_out(true);
        });
        tokenUsersRepository.saveAll(validTokens);
    }

    private void saveUserToken(String jwt,Users user){
        Utoken token = new Utoken();
        token.setToken(jwt);
        token.setLogged_out(false);
        token.setUser(user);
        tokenUsersRepository.save(token);
    }


    public void logoutuser(String token){
        Utoken storedToken = tokenUsersRepository.findByToken(token).orElse(null);
        if(storedToken != null){
            storedToken.setLogged_out(true);
            tokenUsersRepository.save(storedToken);
        }
    }

}
