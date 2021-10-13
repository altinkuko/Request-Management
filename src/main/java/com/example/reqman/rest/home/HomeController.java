package com.example.reqman.rest.home;

import com.example.reqman.security.AuthRequest;
import com.example.reqman.services.userService.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
public class HomeController {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;


    @GetMapping("/")
    public String home() {
        return "home";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            return ResponseEntity.ok(authentication);
        } catch (Exception e) {
            return ResponseEntity.ok(e.getMessage());
        }
    }

//    @GetMapping("/login")
//    public void login(){}

}

