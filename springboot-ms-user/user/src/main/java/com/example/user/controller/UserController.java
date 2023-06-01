package com.example.user.controller;

import com.example.user.model.User;
import com.example.user.service.UserService;
import model.UserLoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserService userService;



    @PostMapping()
    public void addUser(@RequestBody UserLoginDTO user) throws Exception {
        userService.postUser(user);
    }

    @GetMapping("/{id}")
    public Optional<User> findById(@PathVariable("id") Integer id){
        return userService.getCardById(id);
    }

}