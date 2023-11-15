package com.example.user.controller;


import com.example.user.model.User;
import com.example.user.UserConnectedDTO;
import com.example.user.UserLoginDTO;
import com.example.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true")
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping()
    public Iterable<User> getAllUser(){
        return userService.getAllUser();
   }

    @PostMapping()
    public String addUser(@RequestBody UserLoginDTO user) throws Exception {
        userService.postUser(user);
        return "Création de l'utilisateur en cours";
    }

    @GetMapping("/{id}")
    public Optional<User> findById(@PathVariable("id") Integer id){
        return userService.getCardById(id);
    }

    @PutMapping("/{id}")
    public void ModifyById(@RequestBody UserConnectedDTO user){
        userService.PutUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody UserLoginDTO userLoginDTO) {
        return userService.getUserByUsernameAndPassword(userLoginDTO.getUsername(), userLoginDTO.getPassword());
    }
}