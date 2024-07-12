package com.example.UsersServer.config;

import com.example.UsersServer.filter.JwtUserAuthenticationFilter;
import com.example.UsersServer.service.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class UserSecurityConfig {


    @Autowired
    private UserServiceImp userServiceImp;

    @Autowired
    private JwtUserAuthenticationFilter jwtUserAuthenticationFilter;

    @Autowired
    private UserCustomLogoutHandler userlogoutHandler;

    @Bean
    public SecurityFilterChain usersecurityFilterChain(HttpSecurity http) throws Exception{

        return http
                .csrf(AbstractHttpConfigurer:: disable)
                .authorizeHttpRequests(
                        req->req.requestMatchers("/Userslogin/**","/Createaccount/**").permitAll()
                                .requestMatchers("/doctoronly/**").hasAnyAuthority("doctor")
                                .requestMatchers("/useronly/**","/Userpage/**").hasAnyAuthority("user")
                                .anyRequest()
                                .authenticated()
                ).userDetailsService(userServiceImp)
                .sessionManagement(session->session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtUserAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(
                        e->e.accessDeniedHandler(
                                (request,response,accessDeniedException)->response.setStatus(403)
                        ).authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .logout(l->l
                        .logoutUrl("/logoutuser")
                        .addLogoutHandler(userlogoutHandler)
                        .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext()
                        ))
                .build();

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }


}
