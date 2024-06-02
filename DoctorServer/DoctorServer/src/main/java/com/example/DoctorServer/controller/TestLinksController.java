package com.example.DoctorServer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestLinksController {

    @GetMapping("/demo")
    public ResponseEntity<String> demo(){
        return ResponseEntity.ok("Hello from demo url");
    }

    @GetMapping("/doctoronly")
    public ResponseEntity<String> doctoronly(){
        return ResponseEntity.ok("Hello from Doctoronly url");
    }

    @GetMapping("/useronly")
    public ResponseEntity<String> useronly(){
        return ResponseEntity.ok("Hello from useronly url");
    }

}
