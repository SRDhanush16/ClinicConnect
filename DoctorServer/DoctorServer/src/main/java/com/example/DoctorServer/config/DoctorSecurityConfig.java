package com.example.DoctorServer.config;

import com.example.DoctorServer.filter.JwtDoctorsAuthenticationFilter;
import com.example.DoctorServer.service.DoctorServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class DoctorSecurityConfig {

    @Autowired
    private DoctorServiceImp doctorServiceImp;

    @Autowired
    private JwtDoctorsAuthenticationFilter jwtDoctorAuthenticationFilter;

    @Autowired
    private DoctorCustomLogoutHandler doctorlogoutHandler;

    @Bean
    public SecurityFilterChain doctorsecurityFilterChainmethod(HttpSecurity http) throws Exception{

        return http
                .csrf(AbstractHttpConfigurer:: disable)
                .authorizeHttpRequests(
                        req->req.requestMatchers("/Createdoctor/**","/Doctorslogin/**","/getDoctorList/**","/Userpage/**").permitAll()
                                .requestMatchers("/doctoronly/**").hasAuthority("doctor")
                                .requestMatchers("/useronly/**").hasAuthority("user")
                                .anyRequest()
                                .authenticated()
                ).userDetailsService(doctorServiceImp)
                .sessionManagement(session->session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtDoctorAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(
                        e->e.accessDeniedHandler(
                                (request,response,accessDeniedException)->response.setStatus(403)
                        ).authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .logout(l->l
                        .logoutUrl("/logoutdoctor")
                        .addLogoutHandler(doctorlogoutHandler)
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
