package com.example.authentication.controller;

import com.example.authentication.service.AuthentificationService;
import com.example.user.model.UserConnectedDTO;
import com.example.user.model.UserLoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auths")
public class AuthentificationController {

    @Autowired
    AuthentificationService authentificationService;

    @PostMapping()
    public UserConnectedDTO testConnexion(@RequestBody UserLoginDTO user) throws Exception {
        return authentificationService.testConnexion(user.getUsername(), user.getPassword());
    }
}