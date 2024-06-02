package com.example.UsersServer.controller;

import com.example.UsersServer.model.AuthenticationResponse;
import com.example.UsersServer.model.Users;
import com.example.UsersServer.model.response.LoginResponse;
import com.example.UsersServer.repository.UsersRepository;
import com.example.UsersServer.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class MainpageController {
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UsersRepository usersRepository;

    /*
    * Endpoint for Login-user : First the user is authenticated
    * the response is constructed = {uid,uname,uphone,uemail,token,flag}
    * sent to the frontend for using this in various purposes like booking, canceling etc
    * */
    @PostMapping("/Userslogin")
    public LoginResponse loginuser(@RequestBody Users loginreq){
        AuthenticationResponse ar = authenticationService.authenticateuser(loginreq);
        System.out.println("Login Successful");
        LoginResponse lgres = new LoginResponse();
        Optional<Users> usr = usersRepository.findByUname(loginreq.getUname());
        if(usr.isPresent()){
            Users user = usr.get();
            lgres.setUid(user.getUid()); // find uid
            lgres.setUname(loginreq.getUname());
            lgres.setUemail(user.getUemail()); // get uemail
            lgres.setUphone(user.getUphone()); // get uphone
            lgres.setToken(ar.getToken());
            lgres.setIslogged(ar.getMessage());
        }else{
            throw new UsernameNotFoundException("User not found");

        }
        return lgres;
    }

    /*
    * For Creating Account, return a flag value to the frontend
    * */
    @PostMapping("/Createaccount")
    public boolean createuser(@RequestBody Users loginreq){
        boolean ar = authenticationService.createaccount(loginreq);
        System.out.println("Account Created Successful");
        return ar ;
    }

    /*
     * For Logging out, return a flag value to the frontend, so that it redirects to the Mainpage of the website
     * */
    @PostMapping("/logoutuser")
    public String logoutuser(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            authenticationService.logoutuser(token);
            return " User Logout Success";
        } else {
            return "Authorization header missing or invalid";
        }
    }


}
