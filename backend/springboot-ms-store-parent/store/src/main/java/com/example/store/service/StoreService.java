package com.example.store.service;

import com.example.card.CardDTO;
import com.example.store.TransactionDTO;
import com.example.store.TypeTransactionEnum;
import com.example.store.model.Transaction;
import com.example.store.repository.StoreRepository;
import com.example.user.UserConnectedDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;

@Service
public class StoreService {

    @Autowired
    StoreRepository storeRepository;

    public CardDTO buyCard(Integer card_id, Long owner_id) throws IOException {
        CardDTO c =  getCard(card_id);
        UserConnectedDTO u = getUser(owner_id.intValue());
        if(u.getMoney()>c.getPrix()) {
            c.setOwner_id(owner_id);
            u.setMoney((int) (u.getMoney()-c.getPrix()));
            saveUser(u);
            saveCard(c);
            TransactionDTO t = new TransactionDTO(Integer.valueOf(owner_id.toString()),card_id, LocalDate.now(), TypeTransactionEnum.ACHAT);
            Transaction transaction = mappeurDTO(t);
            storeRepository.save(transaction);
            return c;
        }else{
            return null;
        }
    }

    public void saveCard(CardDTO card) throws IOException {
        String apiUrl = "http://localhost:8000/cards/"+card.getId();
        RestTemplate restTemplate = new RestTemplate();
        // Configuration des en-têtes de la requête
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        // Création de l'objet HttpEntity contenant l'objet CardDTO dans le corps de la requête
        HttpEntity<CardDTO> requestEntity = new HttpEntity<>(card, headers);
        // Envoi de la requête PUT et récupération de la réponse
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.PUT, requestEntity, String.class);
        // Extraction des données de la réponse
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
    }

    public void saveUser(UserConnectedDTO user) throws IOException {
        String apiUrl = "http://localhost:8000/users/"+user.getId();
        RestTemplate restTemplate = new RestTemplate();
        // Configuration des en-têtes de la requête
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        // Création de l'objet HttpEntity contenant l'objet CardDTO dans le corps de la requête
        HttpEntity<UserConnectedDTO> requestEntity = new HttpEntity<>(user, headers);
        // Envoi de la requête PUT et récupération de la réponse
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.PUT, requestEntity, String.class);
        // Extraction des données de la réponse
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
    }

    public CardDTO getCard(Integer card_id) throws IOException {
        String apiUrl = "http://localhost:8000/cards/"+card_id;
        RestTemplate restTemplate = new RestTemplate();
        // Envoi de la requête GET et récupération de la réponse
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.GET, null, String.class);
        // Extraction des données de la réponse
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(responseBody, CardDTO.class);
    }

    public UserConnectedDTO getUser(int owner_id) throws IOException {
        String apiUrl = "http://localhost:8000/users/"+owner_id;
        RestTemplate restTemplate = new RestTemplate();
        // Envoi de la requête GET et récupération de la réponse
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.GET, null, String.class);
        // Extraction des données de la réponse
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(responseBody, UserConnectedDTO.class);
    }

    public CardDTO sellCard(Integer card_id) throws IOException {
        CardDTO c =  getCard(card_id);
        UserConnectedDTO u = getUser(c.getOwner_id().intValue());
        u.setMoney((int) (u.getMoney()+c.getPrix()));
        saveUser(u);
        c.setOwner_id(null);
        saveCard(c);
        TransactionDTO t = new TransactionDTO(Integer.valueOf(u.getId().toString()),card_id, LocalDate.now(), TypeTransactionEnum.VENTE);
        Transaction transaction = mappeurDTO(t);
        storeRepository.save(transaction);
        return c;
    }


    public Transaction mappeurDTO(TransactionDTO t){
        Transaction transac = new Transaction();
        transac.setUser_id(t.getUser_id());
        transac.setCard_id(t.getCard_id());
        transac.setType(t.getType().toString());
        transac.setDate(t.getDate());
        return transac;
    }

}
