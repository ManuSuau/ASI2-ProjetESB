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


    public String login(UserLoginDTO userLoginDTO) throws IOException {
        String apiUrl = "http://localhost:8083/users/login";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<UserLoginDTO> request = new HttpEntity<>(userLoginDTO, headers);

        // Envoi de la requête GET et récupération de la réponse
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, request, String.class);
        return response.getBody();
    }

    public String register(UserLoginDTO userLoginDTO) throws IOException {
        String apiUrl = "http://localhost:8083/users";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Assuming userLoginDTO is an instance of UserLoginDTO
        HttpEntity<UserLoginDTO> request = new HttpEntity<>(userLoginDTO, headers);

        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, request, String.class);
        return response.getBody();

    }
}