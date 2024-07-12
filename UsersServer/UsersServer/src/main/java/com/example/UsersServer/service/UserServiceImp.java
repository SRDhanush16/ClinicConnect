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

    /*
    * Remember we implemented UserDetails for the Users class(Entity in the model package)
    * The Spring security has many methods, but there is no methods that accepts( parameters) which is of the type Users
    * For each application the entity will change, so the spring security choose abstraction to be it  parameters
    * here abstraction is the UserDetails, the spring security has methods that deals with UserDetails and not the entity itself.
    * So we need to get data as a form of UserDetails and not as a form of Users( The Entity) itself
    * so that's why we have implemented Users implements UserDetails
    * */
    public UserDetails loadUserByUsername(String uname) throws UsernameNotFoundException {
        return usersRespository.findByUname(uname)
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));
    }
}
