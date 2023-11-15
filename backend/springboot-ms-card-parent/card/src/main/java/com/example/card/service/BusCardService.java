package com.example.card.service;

import com.example.card.CardDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import javax.jms.TextMessage;

@Service
public class BusCardService {

    @Autowired
    JmsTemplate jmsTemplate;

    @Autowired
    ObjectMapper objectMapper;


    public void sendMsg(CardDTO cardDTO) {
        sendMsg(cardDTO, "CARDBUS");
    }

    public void sendMsg(CardDTO cardDTO, String busName) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+cardDTO+"] to Bus=["+busName+"]");

        jmsTemplate.send(busName, s -> {
            try {
                TextMessage msg = s.createTextMessage(objectMapper.writeValueAsString(cardDTO));
                msg.setStringProperty("Content-Type", "application/json");
                msg.setStringProperty("ObjectType", cardDTO.getClass().getCanonicalName());

                return msg;
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        });
    }

}