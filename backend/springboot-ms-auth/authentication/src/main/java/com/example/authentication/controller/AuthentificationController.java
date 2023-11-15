package com.example.authentication.controller;

import com.example.authentication.service.AuthentificationService;
import com.example.user.UserConnectedDTO;
import com.example.user.UserLoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true")
@RequestMapping("auths")
public class AuthentificationController {

    @Autowired
    AuthentificationService authentificationService;

    @PostMapping("/login")
    public String login(@RequestBody UserLoginDTO userLoginDTO) throws IOException {
        return authentificationService.login(userLoginDTO);
    }

    @PostMapping("/register")
    public String register(@RequestBody UserLoginDTO userLoginDTO) throws IOException {
        return authentificationService.register(userLoginDTO);
    }


}