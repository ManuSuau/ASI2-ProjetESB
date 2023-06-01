package com.example.authentication.service;

import model.UserConnectedDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthentificationService {

    @Autowired
    private UserRepository userRepository;


    public UserConnectedDTO testConnexion(String username, String password) {
        User user = userRepository.findByUsernameAndPassword(username, password);
        UserConnectedDTO userConnectedDTO = new UserConnectedDTO();
        userConnectedDTO.setId(user.getId());
        userConnectedDTO.setUsername(user.getUsername());
        userConnectedDTO.setPassword(user.getPassword());
        userConnectedDTO.setMoney(user.getMoney());
        return userConnectedDTO;
    }
}
