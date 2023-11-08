package com.example.authentication.controller;

import com.example.authentication.service.AuthentificationService;
import com.example.user.UserConnectedDTO;
import com.example.user.UserLoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("auths")
public class AuthentificationController {

    @Autowired
    AuthentificationService authentificationService;

    @PostMapping("/login")
    public UserConnectedDTO login(@RequestBody UserLoginDTO userLoginDTO) throws IOException {
        return authentificationService.login(userLoginDTO);
    }


}