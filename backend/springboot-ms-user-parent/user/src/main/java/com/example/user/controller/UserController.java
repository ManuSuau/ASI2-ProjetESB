package com.example.user.controller;


import com.example.user.model.User;
import com.example.user.UserConnectedDTO;
import com.example.user.UserLoginDTO;
import com.example.user.service.UserService;
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

    @PutMapping("/{id}")
    public UserConnectedDTO ModifyById(@RequestBody UserConnectedDTO user){
        return userService.PutUser(user);
    }

    @GetMapping()
    public UserConnectedDTO findByUsernameAndPassword(@RequestParam("username") String username, @RequestParam("password") String password){
        User user = userService.getUserByUsernameAndPassword(username,password);
        UserConnectedDTO dto = new UserConnectedDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setPassword(user.getPassword());
        dto.setMoney(user.getMoney());
        return dto;
    }

    @GetMapping("/login")
    public User login(@RequestBody UserLoginDTO userLoginDTO) throws Exception {
        return userService.getUserByUsernameAndPassword(userLoginDTO.getUsername(), userLoginDTO.getPassword());
    }

    @PostMapping("/register")
    public User register(@RequestBody UserLoginDTO userLoginDTO) throws Exception {
        return userService.postUser(userLoginDTO);
    }
}