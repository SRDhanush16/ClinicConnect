package com.example.UsersServer.config;

import com.example.UsersServer.model.Utoken;
import com.example.UsersServer.repository.TokenUsersRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;

@Configuration
public class UserCustomLogoutHandler implements LogoutHandler {

    @Autowired
    private TokenUsersRepository tokenRepository;

    @Override
    public void logout(HttpServletRequest request,
                       HttpServletResponse response,
                       Authentication authentication) {
        // get the Authorization header , you can check it in axios methods in frontend
        /*
        *  Since we are logging out, lets say that we are giving back our token
        * */
        String authHeader = request.getHeader("Authorization");

        /*
        * its checking for " Bearer ", if not present then just return, dont logout
        * */
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        /*
        * extract the token from the "Bearer "
        * find the token in the database else return null, .orElse handle that null pointer exception
        *  */
        String token = authHeader.substring(7);
        Utoken storedToken = tokenRepository.findByToken(token).orElse(null);

        /*
        * If you find the token, set logout for that token to true and save that token in the database.
        * */
        if(storedToken != null) {
            storedToken.setLogged_out(true);
            tokenRepository.save(storedToken);
        }
    }

}
