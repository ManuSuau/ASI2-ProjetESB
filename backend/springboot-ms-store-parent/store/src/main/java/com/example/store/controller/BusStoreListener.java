package com.example.store.controller;

import com.example.store.TransactionDTO;
import com.example.store.service.StoreService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import javax.jms.JMSException;
import javax.jms.TextMessage;
import java.io.IOException;

@Component
public class BusStoreListener {

    @Autowired
    JmsTemplate jmsTemplate;

    @Autowired
    private StoreService storeService;

    @Autowired
    ObjectMapper objectMapper;

    private void doReceive(TextMessage message) {
        try {
            String clazz = message.getStringProperty("ObjectType");
            Object o = objectMapper.readValue(message.getText(), Class.forName(clazz));

            if (o instanceof TransactionDTO) {
                TransactionDTO transactionDTO = (TransactionDTO) o;
                storeService.saveTransaction(transactionDTO);
            }

            System.out.println("[BUSLISTENER] [CHANNEL STOREBUS] RECEIVED String MSG=["+message.getText()+"]");
        } catch (IOException | JMSException | ClassNotFoundException  e) {
            throw new RuntimeException(e);
        }
    }


    @JmsListener(destination = "STOREBUS", containerFactory = "connectionFactory")
    public void receiveMessageCard(TextMessage message) {
        doReceive(message);
    }

}
