package com.example.card.controller;

import com.example.card.CardDTO;
import com.example.card.service.CardService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import javax.jms.JMSException;
import javax.jms.TextMessage;
import java.io.IOException;

@Component
public class BusCardListener {

    @Autowired
    JmsTemplate jmsTemplate;

    @Autowired
    private CardService cardService;

    @Autowired
    ObjectMapper objectMapper;


    private void doReceive(TextMessage message) {
        try {
            String clazz = message.getStringProperty("ObjectType");
            Object o = objectMapper.readValue(message.getText(), Class.forName(clazz));

            if (o instanceof CardDTO) {
                CardDTO cardDTO = (CardDTO) o;
                cardService.addCard(cardService.mappeurDTO(cardDTO));
            }

            System.out.println("[BUSLISTENER] [CHANNEL CARDBUS] RECEIVED String MSG=["+message.getText()+"]");
        } catch (IOException | JMSException | ClassNotFoundException  e) {
            throw new RuntimeException(e);
        }
    }


    @JmsListener(destination = "CARDBUS", containerFactory = "connectionFactory")
    public void receiveMessageCard(TextMessage message) {
        doReceive(message);
    }

}
