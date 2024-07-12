package com.example.UsersServer.filter;

import com.example.UsersServer.service.JwtService;
import com.example.UsersServer.service.UserServiceImp;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtUserAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserServiceImp userServiceImp;

    /* this is a method of OncePerRequestFilter, which is filter
    * we check for "Bearer " token if it doesnt exist, then just return , basically telling the authorization is not compatiable
    * else we extract the token from the request header
    * we check whether the token is valid , then allow the request
    *
    * Example is Airport,
    * they check your  flight ticket first,
    * lets say you carry a pretty big luggage, so you cant take it with you since it need to to the baggage part of the aeroplane
    * so the process is
    *
    * 1) first in the counter( ticket counter) the officer enters the details of the person and luggage
    * 2)then they create a barcode to distinguish the luggage
    * 3) finally they put that in converier belt and send it to the ground men
    * 4) they will put our luggage into the plane.
    *
    * bascially line 63 to 72 is analogous to this above mentioned example and process
    *
    *  */
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request,response);
            return;
        }
        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);

        if(username != null && SecurityContextHolder.getContext().getAuthentication() ==null){
            UserDetails userDetails = userServiceImp.loadUserByUsername(username);
            if(jwtService.isValidUser(token,userDetails)){
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,null,userDetails.getAuthorities()
                );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request,response);

    }
}
