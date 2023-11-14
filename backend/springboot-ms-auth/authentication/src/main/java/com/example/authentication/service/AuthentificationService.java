package com.example.authentication.service;

import com.example.user.UserConnectedDTO;
import com.example.user.UserLoginDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.PushBuilder;
import java.io.IOException;
import java.util.Optional;

@Service
public class AuthentificationService {


    public UserConnectedDTO login(UserLoginDTO userLoginDTO) throws IOException {
        String apiUrl = "http://localhost:8083/users/login?username=" + userLoginDTO.getUsername() + "&password=" + userLoginDTO.getPassword() + "";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<UserLoginDTO> request = new HttpEntity<>(userLoginDTO, headers);

        // Envoi de la requête GET et récupération de la réponse
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, request, String.class);
        // Extraction des données de la réponse
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        if (responseBody == null) {
            return new UserConnectedDTO();
        }
        else {
            UserConnectedDTO userDTO = objectMapper.readValue(responseBody, UserConnectedDTO.class);
            return userDTO;
        }
    }

    public UserConnectedDTO register(UserLoginDTO userLoginDTO) throws IOException {
        String apiUrl = "http://localhost:8083/users/register?username=" + userLoginDTO.getUsername() + "&password=" + userLoginDTO.getPassword() + "";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Assuming userLoginDTO is an instance of UserLoginDTO
        HttpEntity<UserLoginDTO> request = new HttpEntity<>(userLoginDTO, headers);

        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, request, String.class);
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        UserConnectedDTO userDTO = objectMapper.readValue(responseBody, UserConnectedDTO.class);
        return userDTO;
    }
}