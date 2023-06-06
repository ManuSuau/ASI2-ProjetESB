package com.example.authentication.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import model.UserConnectedDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Service
public class AuthentificationService {




    public UserConnectedDTO testConnexion(String username, String password) throws IOException {
        //UserConnectedDTO user = userRepository.findByUsernameAndPassword(username, password);
        String apiUrl = "http://localhost:8000/user/";
        RestTemplate restTemplate = new RestTemplate();
        // Envoi de la requête GET et récupération de la réponse
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.GET, null, String.class);
        // Extraction des données de la réponse
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        UserConnectedDTO userDTO = objectMapper.readValue(responseBody, UserConnectedDTO.class);
        /* UserConnectedDTO userConnectedDTO = new UserConnectedDTO();
        userConnectedDTO.setId(user.getId());
        userConnectedDTO.setUsername(user.getUsername());
        userConnectedDTO.setPassword(user.getPassword());
        userConnectedDTO.setMoney(user.getMoney()); */
        return userDTO;
    }
}
