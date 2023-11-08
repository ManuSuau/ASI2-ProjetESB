package com.example.authentication.service;

import com.example.user.UserConnectedDTO;
import com.example.user.UserLoginDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.PushBuilder;
import java.io.IOException;

@Service
public class AuthentificationService {


    public UserConnectedDTO login(UserLoginDTO userLoginDTO) throws IOException {
        String apiUrl = "http://localhost:8083/user/login?username=" + userLoginDTO.getUsername() + "&password=" + userLoginDTO.getPassword() + "";
        RestTemplate restTemplate = new RestTemplate();
        // Envoi de la requête GET et récupération de la réponse
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.GET, null, String.class);
        // Extraction des données de la réponse
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        UserConnectedDTO userDTO = objectMapper.readValue(responseBody, UserConnectedDTO.class);
        return userDTO;
    }

    public UserConnectedDTO register(UserLoginDTO userLoginDTO) throws IOException {
        String apiUrl = "http://localhost:8083/user/register?username=" + userLoginDTO.getUsername() + "&password=" + userLoginDTO.getPassword() + "";
        RestTemplate restTemplate = new RestTemplate();
        // Envoi de la requête GET et récupération de la réponse
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.GET, null, String.class);
        // Extraction des données de la réponse
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        UserConnectedDTO userDTO = objectMapper.readValue(responseBody, UserConnectedDTO.class);
        return userDTO;
    }
}